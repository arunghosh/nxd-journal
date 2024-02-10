import React from "react";
import ReactDOM from "react-dom/client";
import "core-js/stable";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import "regenerator-runtime/runtime";
import App from "./App.tsx";
import "./index.css";

dayjs.extend(relativeTime)
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
