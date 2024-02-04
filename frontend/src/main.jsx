import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//layout
import RootLayout from "./routes/route.jsx";
import DashLayout from "./routes/DashLayout.jsx";

//pages
import Home from "./pages/Home.jsx";
import Tasks from "./pages/Tasks.jsx";
import Profile from "./pages/Profile.jsx";
import Setting from "./pages/Setting.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

//private

import Private from "./Private.jsx";
//redux
import { store } from "./app/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <Private>
            {" "}
            <DashLayout />{" "}
          </Private>
        }
      >
        <Route index element={<Home />} />
        <Route path="/dashboard/tasks" element={<Tasks />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/setting" element={<Setting />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
