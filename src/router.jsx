import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import GuestLayout from "./components/GuestLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      }
    ],
  },

]);

export default router;
