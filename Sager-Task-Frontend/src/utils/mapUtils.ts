import type { GeoJSONFeature } from "mapbox-gl";
import {
  CIRCLES_LAYERS_ID,
  DRONE_ICONS_LAYER_ID,
  PATHS_LAYER_ID,
  PATHS_SOURCE_ID,
  POINTS_SOURCE_ID,
} from "./constants";
import type {
  DroneFeatureCollection,
  DroneFeatureProperties,
} from "../types/mapTypes";
import type { Feature, Point, LineString } from "geojson";
import IconDrone from "../../../Sager-Task-Backend/Icon/drone.svg";
import { popup } from "./PopupInstance"; // singleton popup instance

function formatElapsedTime(start: number): string {
  const elapsedSeconds = Math.floor((Date.now() - start) / 1000);
  const h = String(Math.floor(elapsedSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(elapsedSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export const getStatusColor = (registration: string) => {
  return registration.split("-")[1]?.startsWith("B") ? "green" : "red";
};

export function flyToDrone(map: mapboxgl.Map, coordinates: [number, number]) {
  map.flyTo({ center: coordinates, zoom: 15 });
}

export function generateDroneProperties(
  props: DroneFeatureProperties
): DroneFeatureProperties {
  return { ...props, statusColor: getStatusColor(props.registration) };
}

export const handleMapClick = (
  e: mapboxgl.MapMouseEvent,
  map: mapboxgl.Map,
  setClickedFeature: (d: GeoJSONFeature | null) => void
) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: [CIRCLES_LAYERS_ID],
  });

  if (features.length) {
    const clickedDrone: GeoJSONFeature = features[0];
    setClickedFeature(clickedDrone);

    // reset clicked feature after short delay
    setTimeout(() => setClickedFeature(null), 1000);
  }
};

export const handleMapMouseMove = (
  e: mapboxgl.MapMouseEvent,
  map: mapboxgl.Map
) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: [CIRCLES_LAYERS_ID],
  });

  if (features.length === 0) {
    popup.remove(); // remove popup when not hovering over a drone
    return;
  }

  const hoveredDrone: GeoJSONFeature = features[0];
  const hoveredDroneProps = hoveredDrone.properties as DroneFeatureProperties;

  const flightTime = formatElapsedTime(hoveredDroneProps.startFlightTime);

  if (hoveredDrone.geometry.type === "Point") {
    // update and show singleton popup
    popup
      .setLngLat([
        hoveredDrone.geometry.coordinates[0],
        hoveredDrone.geometry.coordinates[1],
      ])
      .setHTML(
        `
        <div style="
          color: #1c1c1c;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 10px;
          gap:5px;
        ">
          <div style="font-weight: 600; font-size: 14px;">
            ${hoveredDroneProps.Name}
          </div>
          <div style="display: flex; justify-content: space-between; gap:10px;">
            <div style="display: flex; flex-direction: column; justify-content: space-between;">
              <span>Altitude</span>
              <span>${hoveredDroneProps.altitude} m</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between;">
              <span>Flight Time</span>
              <span>${flightTime}</span>
            </div>
          </div>
        </div>
      `
      )
      .addTo(map);
  }
};

export function updateDroneData(
  newFeature: Feature<Point, DroneFeatureProperties>,
  existingDrones: Feature<LineString, DroneFeatureProperties>[],
  setDrones: (drones: Feature<LineString, DroneFeatureProperties>[]) => void
) {
  const registration = newFeature.properties.registration;
  const existingIndex = existingDrones.findIndex(
    (drone) => drone.properties?.registration === registration
  );

  if (existingIndex !== -1)
    updateExistingDrone(existingDrones, existingIndex, newFeature);
  else addNewDrone(existingDrones, newFeature);

  setDrones(existingDrones);
}

export function updateExistingDrone(
  drones: Feature<LineString, DroneFeatureProperties>[],
  index: number,
  newFeature: Feature<Point, DroneFeatureProperties>
) {
  const existingDrone = drones[index];

  // append new coordinate to LineString
  existingDrone.geometry.coordinates.push(newFeature.geometry.coordinates);

  // update properties but keep original startFlightTime
  existingDrone.properties = {
    ...generateDroneProperties(newFeature.properties),
    startFlightTime: existingDrone.properties.startFlightTime,
  };

  drones[index] = existingDrone;
}

export function addNewDrone(
  drones: Feature<LineString, DroneFeatureProperties>[],
  newFeature: Feature<Point, DroneFeatureProperties>
) {
  const lineFeature: Feature<LineString, DroneFeatureProperties> = {
    ...newFeature,
    geometry: {
      type: "LineString",
      coordinates: [newFeature.geometry.coordinates],
    },
    properties: {
      ...generateDroneProperties(newFeature.properties),
      startFlightTime: Date.now(),
    },
  };
  drones.push(lineFeature);
}

export function updateMapVisualization(
  map: mapboxgl.Map,
  existingDrones: Feature<LineString, DroneFeatureProperties>[]
) {
  if (!map?.loaded()) return;

  const lineFeatures = existingDrones;
  const pointFeatures = createGeoJSONFeatures(existingDrones);

  addMapSources(map, lineFeatures, pointFeatures);
  addMapLayers(map);
}

export function createGeoJSONFeatures(
  drones: Feature<LineString, DroneFeatureProperties>[]
): Feature<Point, DroneFeatureProperties>[] {
  return drones.map((drone) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: drone.geometry.coordinates.at(-1)!,
    }, // last coordinate
    properties: { ...drone.properties },
  }));
}

export function addMapSources(
  map: mapboxgl.Map,
  lineFeatures: Feature<LineString, DroneFeatureProperties>[],
  pointFeatures: Feature<Point, DroneFeatureProperties>[]
) {
  addMapSource(map, PATHS_SOURCE_ID, {
    type: "FeatureCollection",
    features: lineFeatures,
  });
  addMapSource(map, POINTS_SOURCE_ID, {
    type: "FeatureCollection",
    features: pointFeatures,
  });
}

export function addMapSource(
  map: mapboxgl.Map,
  sourceId: string,
  data: DroneFeatureCollection
) {
  const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource;

  if (source) source.setData(data); // update existing source
  else map.addSource(sourceId, { type: "geojson", data }); // create new source
}

export function addMapLayers(map: mapboxgl.Map) {
  addDroneIconImg(map);
  addPathLayer(map);
  addCircleLayer(map);
  addDroneIconLayer(map);
}

export function addDroneIconImg(map: mapboxgl.Map) {
  if (!map.hasImage("drone-icon")) {
    const img = new Image(20, 20);
    img.onload = () => map.addImage("drone-icon", img, { sdf: true });
    img.src = IconDrone;
  }
}

export function addPathLayer(map: mapboxgl.Map) {
  if (!map.getLayer(PATHS_LAYER_ID)) {
    map.addLayer({
      id: PATHS_LAYER_ID,
      type: "line",
      source: PATHS_SOURCE_ID,
      paint: { "line-width": 3, "line-color": ["get", "statusColor"] },
    });
  }
}

export function addCircleLayer(map: mapboxgl.Map) {
  if (!map.getLayer(CIRCLES_LAYERS_ID)) {
    map.addLayer({
      id: CIRCLES_LAYERS_ID,
      type: "circle",
      source: POINTS_SOURCE_ID,
      paint: {
        "circle-radius": 14,
        "circle-color": ["get", "statusColor"],
        "circle-opacity": 0.8,
      },
    });
  }
}

export function addDroneIconLayer(map: mapboxgl.Map) {
  if (!map.getLayer(DRONE_ICONS_LAYER_ID)) {
    map.addLayer({
      id: DRONE_ICONS_LAYER_ID,
      type: "symbol",
      source: POINTS_SOURCE_ID,
      layout: {
        "icon-image": "drone-icon",
        "icon-size": 1,
        "icon-rotate": ["get", "yaw"],
        "icon-allow-overlap": true,
      },
      paint: { "icon-color": "white" },
    });
  }
}
