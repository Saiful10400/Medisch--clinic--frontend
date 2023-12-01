import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import useAxiosPublic from "../custom Hooks/useAxiosPublic";
import { dataProvider } from "../Context Api/DataProvider";
import loadinggif from "../../../public/image/loading.gif";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(dataProvider);
  const {
    data: userdata,
    refetch,
    isPending: isLoading,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
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
   

  if (userdata?.role === "admin" && user) {
    return children;
  } else if (userdata?.role === "user" && user) {
    console.log("fireing");
    return <Navigate to={"/"}></Navigate>;
  } else if (!userdata) {
    return (
      <div className="w-full bg-white fixed top-0 left-0 h-screen flex justify-center items-center">
        <img src={loadinggif} alt="" />
      </div>
    );
  }
};

export default AdminRoute;
