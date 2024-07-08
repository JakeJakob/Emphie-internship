import { createBrowserRouter, Link} from "react-router-dom";
import Starting_Page from "./admin-panel/start-page.tsx";
import Landing_Page from "./admin-panel/tournament-page.tsx";

export const router = createBrowserRouter([
    {path: "/", element: <Starting_Page/>},
    {
      path: "Landing_Page",
      element: <Landing_Page/>,
    }
  ]);