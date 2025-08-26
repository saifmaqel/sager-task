import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useDroneStore } from "../../stores/droneStors";
import IconDrone from "../../../../Sager-Task-Backend/Icon/drone.svg";
// import { getStatusColor } from "../../utils/droneUtils";
import type {
  DroneFeatureCollection,
  DroneFeatureProperties,
} from "../../types/mapTypes";
import type { Feature, Geometry } from "geojson";

export function MapboxMapContainer() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const drones = useDroneStore((state) => state.drones);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [35.91, 31.95],
      zoom: 10,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || drones.length === 0 || !mapRef.current.loaded())
      return;

    // if (drones.length > 15) return;

    const map = mapRef.current;
    const pathsSourceId = "drones-paths";
    const pointsSourceId = "drones-points";

    const pathLayerId = "drones-path-layer";
    const circlesLayerId = "drones-circle-layer";
    const droneIconsLayerId = "drones-icon-layer";

    const lineFeatures: Feature<Geometry, DroneFeatureProperties>[] = [];
    const pointFeatures: Feature<Geometry, DroneFeatureProperties>[] = [];

    drones.forEach((drone) => {
      if (drone.geometry.type === "LineString") {
        lineFeatures.push(drone);

        const coords = drone.geometry.coordinates;
        const lastCoord = coords[coords.length - 1];

        pointFeatures.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: lastCoord,
          },
          properties: {
            ...drone.properties,
          },
        });
      }
    });

    const pathGeoJSON: DroneFeatureCollection = {
      type: "FeatureCollection",
      features: lineFeatures,
    };

    const pointsGeoJSON: DroneFeatureCollection = {
      type: "FeatureCollection",
      features: pointFeatures,
    };

    if (!map.hasImage("drone-icon")) {
      const img = new Image(20, 20);
      img.onload = () => map.addImage("drone-icon", img, { sdf: true });
      img.src = IconDrone;
    }

    if (!map.getSource(pathsSourceId)) {
      map.addSource(pathsSourceId, {
        type: "geojson",
        data: pathGeoJSON,
      });
    } else {
      (map.getSource(pathsSourceId) as mapboxgl.GeoJSONSource).setData(
        pathGeoJSON
      );
    }

    if (!map.getSource(pointsSourceId)) {
      map.addSource(pointsSourceId, {
        type: "geojson",
        data: pointsGeoJSON,
      });
    } else {
      (map.getSource(pointsSourceId) as mapboxgl.GeoJSONSource).setData(
        pointsGeoJSON
      );
    }

    if (!map.getLayer(pathLayerId)) {
      map.addLayer({
        id: pathLayerId,
        type: "line",
        source: pathsSourceId,
        paint: {
          "line-width": 3,
          "line-color": ["get", "statusColor"],
        },
      });
    }

    if (!map.getLayer(circlesLayerId)) {
      map.addLayer({
        id: circlesLayerId,
        type: "circle",
        source: pointsSourceId,
        paint: {
          "circle-radius": 14,
          "circle-color": ["get", "statusColor"],
          "circle-opacity": 0.8,
        },
      });
    }

    if (!map.getLayer(droneIconsLayerId)) {
      map.addLayer({
        id: droneIconsLayerId,
        type: "symbol",
        source: pointsSourceId,
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
  }, [drones]);

  // useEffect(() => {
  //   if (!mapRef.current || drones.length === 0 || !mapRef.current.loaded())
  //     return;

  //   const map = mapRef.current;
  //   const sourceId = "drones-source";
  //   const layerId = "drones-layer";

  //   // Add image if not exists
  //   if (!map.hasImage("drone-icon")) {
  //     const img = new Image(20, 20);
  //     img.onload = () => map.addImage("drone-icon", img, { sdf: true });
  //     img.src = IconDrone;
  //   }

  //   // Check if source exists
  //   const source = map.getSource(sourceId) as
  //     | mapboxgl.GeoJSONSource
  //     | undefined;

  //   if (!source) {
  //     // First time: add source with all drones
  //     map.addSource(sourceId, {
  //       type: "geojson",
  //       data: {
  //         type: "FeatureCollection",
  //         features: drones,
  //       },
  //     });

  //     // Add layers
  //     map.addLayer({
  //       id: layerId,
  //       type: "circle",
  //       source: sourceId,
  //       paint: {
  //         "circle-radius": 15,
  //         "circle-color": [
  //           "case",
  //           ["==", ["slice", ["get", "registration"], 2, 3], "B"],
  //           "green",
  //           "red",
  //         ],
  //         "circle-opacity": 0.6,
  //       },
  //     });

  //     map.addLayer({
  //       id: "layerIds",
  //       type: "symbol",
  //       source: sourceId,
  //       layout: {
  //         "icon-image": "drone-icon",
  //         "icon-size": 1,
  //         "icon-rotate": ["get", "yaw"],
  //         "icon-allow-overlap": true,
  //       },
  //       paint: {
  //         "icon-color": "white",
  //       },
  //     });
  //   } else {
  //     // Merge new drones with existing ones
  //     const currentData = (source as mapboxgl.GeoJSONSource)
  //       ._data as DroneFeatureCollection;
  //     const existingIds = new Set(
  //       currentData.features.map((f) => f.properties.serial)
  //     ); // assuming each drone has a unique id
  //     const newFeatures = drones.filter(
  //       (f) => !existingIds.has(f.properties.serial)
  //     );

  //     if (newFeatures.length > 0) {
  //       const updatedData: DroneFeatureCollection = {
  //         type: "FeatureCollection",
  //         features: [...currentData.features, ...newFeatures],
  //       };
  //       source.setData(updatedData);
  //     }
  //   }
  // }, [drones]);

  return (
    <div
      id="mapRef.current-container"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
