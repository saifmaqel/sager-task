import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
} from "ag-grid-community";
import {
  ModuleRegistry,
  AllCommunityModule,
  colorSchemeDarkBlue,
  themeQuartz,
} from "ag-grid-community";
import { useDroneStore } from "../../stores/droneStors";
import type { DroneFeatureProperties } from "../../types/mapTypes";

ModuleRegistry.registerModules([AllCommunityModule]);
const themeDarkBlue = themeQuartz.withPart(colorSchemeDarkBlue);

export default function DashboardAgGrid() {
  const drones = useDroneStore((state) => state.drones);
  const rowData = drones.map((drone) => drone.properties);

  const columns: ColDef<DroneFeatureProperties>[] = [
    {
      field: "serial",
      headerName: "Serial",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "registration",
      headerName: "Registration",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "altitude",
      headerName: "Altitude (m)",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "pilot",
      headerName: "Pilot",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "organization",
      headerName: "Organization",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      field: "statusColor",
      headerName: "Status",
      flex: 1,
      sortable: true,
      filter: true,
      cellRenderer: (params: ICellRendererParams<DroneFeatureProperties>) => (
        <span
          style={{
            color: params.value === "green" ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {params.value === "green" ? "Allowed" : "Not Allowed"}
        </span>
      ),
    },
    {
      field: "startFlightTime",
      headerName: "Start Flight",
      flex: 1,
      sortable: true,
      filter: true,
      valueFormatter: (params: ValueFormatterParams) => {
        const date = new Date(params.value * 1000);
        return date.toLocaleString();
      },
    },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{ flex: 1, minHeight: 0, marginTop: 20 }}
    >
      <AgGridReact<DroneFeatureProperties>
        theme={themeDarkBlue}
        rowData={rowData}
        columnDefs={columns}
        defaultColDef={{ resizable: true }}
      />
    </div>
  );
}
