import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../custom Hooks/useAxiosPublic';
import { dataProvider } from '../Context Api/DataProvider';
import { Navigate, useNavigate } from 'react-router-dom';
 


const AdminRoute = ({children}) => {
    const move=useNavigate()
    const axiosPublic=useAxiosPublic()
    const{user}=useContext(dataProvider)
    axiosPublic.post("/single_userdata",{email:user?.email},{withCredentials:true})
        .then(res=>{
         const newdata=res.data.find(item=>item.email.toUpperCase()===user?.email.toUpperCase())
         if(newdata.role==="admin"){
            console.log("hellow want")
            return children
         }
         console.log(newdata)
        //  move("/")

         return children
        })
};

export default AdminRoute;