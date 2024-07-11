import { createBrowserRouter, Link} from "react-router-dom";
import Starting_Page from "./admin-panel/start-page.tsx";
import Landing_Page from "./admin-panel/tournament-page.tsx";
import Players from "./admin-panel/players.tsx";
import Refs from "./admin-panel/refs.tsx";

export const router = createBrowserRouter([
    {path: "/", element: <Starting_Page/>},
    {
      path: "Landing_Page",
      element: <Landing_Page/>,
    },
    {
      path: "Landing_Page/Players",
      element: <Players/>,
    },
    {
      path: "Landing_Page/refs",
      element: <Refs/>,
    }
  ]);