import React, { useContext, useMemo, useState } from "react";

export type MapboxContextValues = {
  map: mapboxgl.Map | undefined;
  setMap: (map: mapboxgl.Map) => void;
};

const defaultValue: MapboxContextValues = {
  map: undefined,
  setMap: () => {},
};

const mapboxContext = React.createContext<MapboxContextValues>(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useMapboxMapContext = () => {
  return useContext(mapboxContext);
};

export const MapboxContextProvider = (props: {
  children?: React.ReactNode;
}) => {
  const mapValue = useProviderMapbox();
  return (
    <mapboxContext.Provider value={mapValue}>
      {props.children}
    </mapboxContext.Provider>
  );
};

function useProviderMapbox(): MapboxContextValues {
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);

  return useMemo(() => {
    return {
      map,
      setMap,
    };
  }, [map]);
}
