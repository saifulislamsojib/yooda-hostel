import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import DashboardIcon from "@mui/icons-material/Dashboard";

const sidebarItems = [
  {
    route: "/",
    title: "Manage Foods",
    icon: DashboardIcon,
  },
  {
    route: "/students",
    title: "Manage Students",
    icon: AccountCircleIcon,
  },
  {
    route: "/distribution",
    title: "Distribution",
    icon: BorderAllIcon,
  },
];

export default sidebarItems;
