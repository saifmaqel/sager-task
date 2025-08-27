import mapboxgl from "mapbox-gl";

/**
Singleton Popup instance
  
  i initialize a single popup here to use throughout the map.
  This ensures that only one popup is ever displayed at a time.
  We can add it, update its content/position, or remove it without
  creating multiple popups on the map.
 */

export const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
  closeOnMove: true,
});
