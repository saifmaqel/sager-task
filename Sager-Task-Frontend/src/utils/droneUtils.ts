export const getStatusColor = (registration: string) => {
  return registration.split("-")[1]?.startsWith("B") ? "green" : "red";
};

export function flyToStore(map: mapboxgl.Map, coordinates: [number, number]) {
  map.flyTo({
    center: coordinates,
    zoom: 15,
  });
}
