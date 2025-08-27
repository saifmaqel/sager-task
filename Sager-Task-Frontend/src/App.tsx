import "./App.css";
import ErrorFallback from "./components/error-boundary/ErrorFallback";
import { MapboxContextProvider } from "./context/mapboxContext";
import AppRoutes from "./routes/AppRoutes";
import { ErrorBoundary } from "react-error-boundary";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MapboxContextProvider>
        <AppRoutes />
      </MapboxContextProvider>
    </ErrorBoundary>
  );
}
