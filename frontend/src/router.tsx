import { createBrowserRouter } from "react-router-dom";
import Starting_Page from "./routes/start-page";
import Landing_Page from "./routes/main-panel/index.tsx";

export const router = createBrowserRouter([
  { path: "/", element: <Starting_Page /> },
  {
    path: "Landing_Page",
    element: <Landing_Page />,
  },
]);
