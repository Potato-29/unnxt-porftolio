import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ClientsView from "./views/ClientsView/ClientsView";
import ClientPage from "./views/ClientPage/ClientPage";
import AddClientForm from "./components/AddClientForm/AddClientForm";
import Login from "./views/Login/Login";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Protected from "./helpers/Protected";
import RemoveClientForm from "./components/RemoveClientForm/RemoveClientForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <ClientsView
          currentSlide={undefined}
          setCurrentSlide={undefined}
          sliderRef={undefined}
        />
      </App>
    ),
  },
  {
    path: "/ClientPage/:id",
    element: (
      <App>
        <ClientPage />
      </App>
    ),
  },
  {
    path: "/login",
    element: (
      <App>
        <Login />
      </App>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <App>
          <ClientsView
            currentSlide={undefined}
            setCurrentSlide={undefined}
            sliderRef={undefined}
          />
        </App>
      </Protected>
    ),
  },
  {
    path: "/dashboard/add",
    element: (
      <Protected>
        <App>
          <AddClientForm />
        </App>
      </Protected>
    ),
  },
  {
    path: "/dashboard/remove",
    element: (
      <Protected>
        <App>
          <></>
        </App>
      </Protected>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
