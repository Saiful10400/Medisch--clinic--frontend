import { useContext } from "react";
import { dataProvider } from "../Context Api/DataProvider";
import { Navigate } from 'react-router-dom';
import loadinggif from "../../../public/image/loading.gif"
 


const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(dataProvider)
    console.log(loading)
  if(user){
    return children
  }
  else if(loading){
    return <div className="w-full bg-white fixed top-0 left-0 h-screen flex justify-center items-center">
        <img src={loadinggif} alt="" />
    </div>
  }
  return <Navigate to={"/login"}></Navigate>
};

export default PrivateRoute;