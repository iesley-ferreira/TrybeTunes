import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import App from "./App";
import { TrybeTunesProvider } from "./context/TrybeTunesContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TrybeTunesProvider>
      <App />
    </TrybeTunesProvider>
  </BrowserRouter>
);
