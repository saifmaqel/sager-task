import "./App.css";
import ErrorFallback from "./components/error-boundary/ErrorFallBack";
import AppRoutes from "./routes/AppRoutes";
import { ErrorBoundary } from "react-error-boundary";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppRoutes />
    </ErrorBoundary>
  );
}
