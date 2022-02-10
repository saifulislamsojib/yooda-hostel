import Distribution from "../pages/Distribution";
import Home from "../pages/Home";
import Students from "../pages/Students";

const routes = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/students",
    Component: Students,
  },
  {
    path: "/distribution",
    Component: Distribution,
  },
];

export default routes;
