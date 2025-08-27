import type { FeatureCollection, Geometry } from "geojson";

export interface DroneFeatureProperties {
  serial: string;
  registration: string;
  Name: string;
  altitude: number;
  pilot: string;
  organization: string;
  yaw: number;
  statusColor: string;
}

export type DroneFeatureCollection<G extends Geometry = Geometry> =
  FeatureCollection<G, DroneFeatureProperties>;
