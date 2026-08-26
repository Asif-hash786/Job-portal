import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Browse from "@/pages/Browse";
import Home from "@/pages/Home";
import Jobs from "@/pages/Jobs";
import Layout from "@/pages/Layout";
import Profile from "@/pages/Profile";
import JobDescription from "@/components/JobDescription"
import Companies from "@/pages/admin/Companies";
import CompanieCreate from "@/pages/admin/CompanieCreate";
import CompanySetup from "@/pages/admin/CompanySetup";
import AdminJob from "@/pages/admin/AdminJob";
import PostJobs from "@/pages/admin/PostJobs";
import Applicants from "@/pages/admin/Applicants";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "@/pages/ProtectedRoute";
import NotFound from "@/pages/NotFound";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProtectedRoute allowedRoles={["student"]}><Home /></ProtectedRoute>
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
        element: <ProtectedRoute allowedRoles={["student"]}><Jobs /></ProtectedRoute>
      },
      {
        path: "/browse",
        element: <ProtectedRoute allowedRoles={["student"]}><Browse /></ProtectedRoute>
      },
      {
        path: "/profile",
        element: <ProtectedRoute allowedRoles={["student"]}><Profile /></ProtectedRoute>
      },
      {
        path: "/description/:id",
        element: <ProtectedRoute allowedRoles={["student"]}><JobDescription /></ProtectedRoute>
      },
      //Admin
      {
        path: "/admin/companies",
        element: <ProtectedRoute allowedRoles={["recruiter"]}><Companies /></ProtectedRoute>
      },
      {
        path: "/admin/companies/create",
        element: <ProtectedRoute allowedRoles={["recruiter"]}><CompanieCreate /></ProtectedRoute>
      },
      {
        path: "/admin/companies/:id",
        element: <ProtectedRoute allowedRoles={["recruiter"]}><CompanySetup /></ProtectedRoute>
      },
      {
        path: "/admin/jobs",
        element: <ProtectedRoute allowedRoles={["recruiter"]}><AdminJob /></ProtectedRoute>
      },
      {
        path: "/admin/jobs/create",
        element: <ProtectedRoute allowedRoles={["recruiter"]}><PostJobs /></ProtectedRoute>
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: <ProtectedRoute allowedRoles={["recruiter"]}><Applicants /></ProtectedRoute>
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
])
export default appRouter;