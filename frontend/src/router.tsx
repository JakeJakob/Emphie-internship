import { createBrowserRouter } from "react-router-dom";

import Login from "./admin-panel/login.tsx";
import AdminPanel from "./admin-panel/admin_panel.tsx";
import Players from "./admin-panel/players.tsx";
import Refs from "./admin-panel/referees.tsx";
import Error from "./Error.tsx";

export const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <Error /> },
  {
    path: "admin_panel",
    element: <AdminPanel />,
  },
  {
    path: "admin_panel/players",
    element: <Players />,
  },
  {
    path: "admin_panel/referees",
    element: <Refs />,
  },
]);
