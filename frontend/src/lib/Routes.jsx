import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])
export default appRouter;