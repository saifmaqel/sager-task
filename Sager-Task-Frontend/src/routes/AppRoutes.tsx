import { LoadingOverlay } from "@mantine/core";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const suspenseFallback = (
  <LoadingOverlay
    visible={true}
    zIndex={1000}
    loaderProps={{ size: "xl", type: "bars" }}
    overlayProps={{ radius: "md", blur: 2 }}
  />
);

const LandingPage = lazy(() => import("../routes/LandingPage"));
const MainMap = lazy(() => import("./MapPage"));
const Dashboard = lazy(() => import("./DashboardPage"));

const landingPageSuspense = (
  <Suspense fallback={suspenseFallback}>
    <LandingPage />
  </Suspense>
);
const MainMapSuspense = (
  <Suspense fallback={suspenseFallback}>
    <MainMap />
  </Suspense>
);
const dashboardSuspense = (
  <Suspense fallback={suspenseFallback}>
    <Dashboard />
  </Suspense>
);

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={landingPageSuspense}>
          <Route index element={<Navigate to="/map" replace />} />
          <Route path="map" element={MainMapSuspense} />
          <Route path="dashboard" element={dashboardSuspense} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
