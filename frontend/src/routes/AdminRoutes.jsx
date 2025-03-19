import Users from "../Dashboard/admin-account/Users";
import Doctors from "../Dashboard/admin-account/Doctors";
import Queries from "../Dashboard/admin-account/Queries";

export const adminRoutes = [
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "doctors",
    element: <Doctors />,
  },
  {
    path: "queries",
    element: <Queries />,
  },
]; 