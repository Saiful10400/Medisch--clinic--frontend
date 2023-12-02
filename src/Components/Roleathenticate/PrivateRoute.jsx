import { useContext } from "react";
import { dataProvider } from "../Context Api/DataProvider";
import { Navigate } from 'react-router-dom';
import loadinggif from "../../../public/image/loading.gif"
import useAxiosPublic from "../custom Hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';
 


const PrivateRoute = ({children}) => {
  const {user,loading}=useContext(dataProvider)

  const axiosPublic = useAxiosPublic();
  const {
    data: userdata,
    refetch,
    isPending: isLoading,
  } = useQuery({
    queryKey: [ user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get_users_admin`);
      const data = res.data;
      const actualUser = data.find(
        (item) => item?.email.toUpperCase() === user?.email.toUpperCase()
      );
      console.log(actualUser);
      return actualUser;
    },
  });



console.log(userdata?.status,isLoading)
    
     
  if(userdata?.status==="active"){
    return children
  }
  else if(loading || isLoading){
    return <div className="w-full bg-white fixed top-0 left-0 h-screen flex justify-center items-center">
        <img src={loadinggif} alt="" />
    </div>
  }
  return <Navigate to={"/login"}></Navigate>
};

export default PrivateRoute;