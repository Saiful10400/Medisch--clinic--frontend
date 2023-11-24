import { createBrowserRouter } from "react-router-dom";
import User from "../User/User";
import Home from "../User/Home/Home";

export const router=createBrowserRouter([{
    path:"/",
    element:<User></User>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        }
    ]
}
]
)