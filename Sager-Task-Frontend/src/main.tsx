import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262B",
      "#141517",
      "#000000",
      "#101113",
    ],
  },
  components: {
    Title: {
      defaultProps: {
        c: "white",
      },
    },
    Text: {
      defaultProps: {
        c: "white",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
