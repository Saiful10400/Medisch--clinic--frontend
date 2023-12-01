import { createBrowserRouter } from "react-router-dom";
import User from "../User/User";
import Home from "../User/Home/Home";
import Login from "../User/Register$Login/Login";
import Register from "../User/Register$Login/Register";
import AdminDashbord from "../Dashbord/AdminDashbord";
import AddBanner from "../Dashbord/AdminDashbord/AddBanner";
import Users from "../Dashbord/AdminDashbord/Users";
import AllBanners from "../Dashbord/AdminDashbord/AllBanners";
import AddTest from "../Dashbord/AdminDashbord/AddTest";
import AllTest from "../Dashbord/AdminDashbord/AllTest";
import Alltest from "../User/All test/Alltest";
import TestDetails from "../User/TestDetails/TestDetails";
import UserDashbord from "../Dashbord/UserDashbord/UserDashbord";
import Myprifile from "../Dashbord/UserDashbord/my profile/Myprifile";
import UpAppoinment from "../Dashbord/UserDashbord/Upcoming appoinment/UpAppoinment";
import TestResult from "../Dashbord/UserDashbord/Test result/TestResult";
import AdminRoute from "../Roleathenticate/AdminRoute";
import Reservation from "../Dashbord/AdminDashbord/Reservation";
import PrivateRoute from "../Roleathenticate/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <User></User>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      
      {
        path:"/allTest",
        element:<Alltest></Alltest>
      },
      {
        path:"/testDetails/:id",
        element:<TestDetails></TestDetails>
      }
    ],
  },
  {
    path: "/adminDashbord",
    // element: <AdminRoute><AdminDashbord></AdminDashbord></AdminRoute>,
    element: <AdminRoute><AdminDashbord></AdminDashbord></AdminRoute>,
    children: [
      {
        path: "allUsers",
        element: <Users></Users>,
      },
      {
        path: "addBanner",
        element: <AddBanner></AddBanner>,
      },
      {
        path: "allBanners",
        element: <AllBanners></AllBanners>,
      },
      {
        path: "addTest",
        element: <AddTest></AddTest>,
      },
      {
        path: "allTests",
        element:<AllTest></AllTest>,
      },
      {
        path: "resurvation",
        element:<Reservation></Reservation>,
      },
      
    ],
  },
  {
    path:"/UserDashbord",
    element:<PrivateRoute><UserDashbord></UserDashbord></PrivateRoute>,
    children:[{
      path:"myProfile",
      element:<Myprifile></Myprifile>
    },
    {
      path:"upcomingAppoinment",
      element:<UpAppoinment></UpAppoinment>
    },
    {
      path:"testResult",
      element:<TestResult></TestResult>
    }
  ]
  }
]);
