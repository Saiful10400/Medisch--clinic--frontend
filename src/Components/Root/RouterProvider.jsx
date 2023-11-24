import { createBrowserRouter } from "react-router-dom";
import User from "../User/User";
import Home from "../User/Home/Home";
import Login from "../User/Register$Login/Login";
import Register from "../User/Register$Login/Register";

export const router=createBrowserRouter([{
    path:"/",
    element:<User></User>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/login",
            element:<Login></Login>
        },
        {
            path:"/register",
            element:<Register></Register>
        }
    ]
}
]
)