import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Browse from "@/pages/Browse";
import Home from "@/pages/Home";
import Jobs from "@/pages/Jobs";
import Layout from "@/pages/Layout";
import Profile from "@/pages/Profile";
import { createBrowserRouter } from "react-router-dom";
import JobDescription from "@/components/JobDescription"
import Companies from "@/pages/admin/Companies";
import CompanieCreate from "@/pages/admin/CompanieCreate";
import CompanySetup from "@/pages/admin/CompanySetup";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index:true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/jobs",
        element: <Jobs />
      },
      {
        path: "/browse",
        element: <Browse />
      }, {
        path: "/profile",
        element: <Profile />
      },
      {
        path:"/description/:id",
        element:<JobDescription/>
      },
      //Admin
      {
        path:"/admin/companies",
        element:<Companies/>
      },
      {
        path:"/admin/companies/create",
        element:<CompanieCreate/>
      },
      {
        path:"/admin/companies/:id",
        element:<CompanySetup/>
      }
    ]
  }
])
export default appRouter;