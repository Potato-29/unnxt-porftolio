import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientsView from "./views/ClientsView/ClientsView";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <ClientsView />
      </App>
    ),
  },
  {
    path: "/work",
    element: (
      <App>
        <ClientsView />
      </App>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
