import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Browse from "@/pages/Browse";
import Home from "@/pages/Home";
import Jobs from "@/pages/Jobs";
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
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/browse",
    element:<Browse/>
  }
])
export default appRouter;