import { useRef, useEffect } from "react";
import { useMapboxMapContext } from "../../context/mapboxContext";
import mapboxgl from "mapbox-gl";
import { useClickedFeatureOnTheMapStore } from "../../stores/clickedFeatureOnTheMapStore";
import { handleMapClick, handleMapMouseMove } from "../../utils/mapUtils";

export function MapboxMapContainer() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapCreatedRef = useRef(false);

  const { setMap } = useMapboxMapContext();
  const setClickedFeature = useClickedFeatureOnTheMapStore(
    (state) => state.setClickedFeature
  );

  useEffect(() => {
    // Initialize mapbox map insatnce and store it in global contaxt
    if (mapCreatedRef.current || !mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const instance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [35.91, 31.95],
      zoom: 10,
    });

    instance.once("load", () => {
      instance.on("click", (e) =>
        handleMapClick(e, instance, setClickedFeature)
      );
      instance.on("mousemove", (e) => handleMapMouseMove(e, instance));
    });

    setMap(instance);
    mapCreatedRef.current = true;

    return () => {
      instance.remove();
      mapCreatedRef.current = false;
      instance.off("click", (e) =>
        handleMapClick(e, instance, setClickedFeature)
      );
    };
  }, [setClickedFeature, setMap]);

  return (
    <div
      id="map-container"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
