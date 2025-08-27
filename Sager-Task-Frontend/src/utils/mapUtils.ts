import type { GeoJSONFeature } from "mapbox-gl";
import {
  CIRCLES_LAYERS_ID,
  DRONE_ICONS_LAYER_ID,
  PATHS_LAYER_ID,
  PATHS_SOURCE_ID,
  POINTS_SOURCE_ID,
} from "./constants";
import mapboxgl from "mapbox-gl";
import type {
  DroneFeatureCollection,
  DroneFeatureProperties,
} from "../types/mapTypes";
import type { Feature, Point, LineString } from "geojson";
import IconDrone from "../../../Sager-Task-Backend/Icon/drone.svg";

export const getStatusColor = (registration: string) => {
  return registration.split("-")[1]?.startsWith("B") ? "green" : "red";
};

export function flyToDrone(map: mapboxgl.Map, coordinates: [number, number]) {
  map.flyTo({
    center: coordinates,
    zoom: 15,
  });
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
    const clickedDroneProps = clickedDrone.properties as DroneFeatureProperties;

    setClickedFeature(clickedDrone);

    if (clickedDrone.geometry.type === "Point") {
      new mapboxgl.Popup()
        .setLngLat([
          clickedDrone.geometry.coordinates[0],
          clickedDrone.geometry.coordinates[1],
        ])
        .setHTML(
          `<div style="color: black; font-weight: bold;">
            ${clickedDroneProps?.Name ?? "Unnamed Drone"}
          </div>`
        )
        .addTo(map);
    }

    setTimeout(() => {
      setClickedFeature(null);
    }, 1000);
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

  if (existingIndex !== -1) {
    updateExistingDrone(existingDrones, existingIndex, newFeature);
  } else {
    addNewDrone(existingDrones, newFeature);
  }

  setDrones(existingDrones);
}

export function updateExistingDrone(
  drones: Feature<LineString, DroneFeatureProperties>[],
  index: number,
  newFeature: Feature<Point, DroneFeatureProperties>
) {
  const existingDrone = drones[index];
  existingDrone.geometry.coordinates.push(newFeature.geometry.coordinates);
  existingDrone.properties = {
    ...newFeature.properties,
    statusColor: getStatusColor(newFeature.properties.registration),
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
      ...newFeature.properties,
      statusColor: getStatusColor(newFeature.properties.registration),
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

  updateMapSources(map, lineFeatures, pointFeatures);
  addMapLayers(map);
}

export function createGeoJSONFeatures(
  drones: Feature<LineString, DroneFeatureProperties>[]
) {
  const pointFeatures: Feature<Point, DroneFeatureProperties>[] = [];

  drones.forEach((drone) => {
    const coordinates = drone.geometry.coordinates;
    const lastCoordinate = coordinates[coordinates.length - 1];

    pointFeatures.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: lastCoordinate,
      },
      properties: { ...drone.properties },
    });
  });

  return pointFeatures;
}

export function updateMapSources(
  map: mapboxgl.Map,
  lineFeatures: Feature<LineString, DroneFeatureProperties>[],
  pointFeatures: Feature<Point, DroneFeatureProperties>[]
) {
  const pathGeoJSON: DroneFeatureCollection = {
    type: "FeatureCollection",
    features: lineFeatures,
  };

  const pointsGeoJSON: DroneFeatureCollection = {
    type: "FeatureCollection",
    features: pointFeatures,
  };

  updateOrCreateSource(map, PATHS_SOURCE_ID, pathGeoJSON);
  updateOrCreateSource(map, POINTS_SOURCE_ID, pointsGeoJSON);
}

export function updateOrCreateSource(
  map: mapboxgl.Map,
  sourceId: string,
  data: DroneFeatureCollection
) {
  const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource;

  if (source) {
    source.setData(data);
  } else {
    map.addSource(sourceId, {
      type: "geojson",
      data,
    });
  }
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
      paint: {
        "line-width": 3,
        "line-color": ["get", "statusColor"],
      },
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
      paint: {
        "icon-color": "white",
      },
    });
  }
}
