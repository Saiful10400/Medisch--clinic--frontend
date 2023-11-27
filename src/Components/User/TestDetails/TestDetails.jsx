import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

 
const TestDetails = () => {
    const axiosPublic=useAxiosPublic()
    const {id}=useParams()
    const[data,setData]=useState(null)
    useEffect(()=>{
        axiosPublic.get(`/Single_test?id=${id}`)
        .then(res=>setData(res.data))
    },[])
    console.log(data)
    return (
        <div className="lg:w-[1400px] mx-auto flex lg:flex-row flex-col">
            <div className="lg:w-1/2">
                <img className="w-full object-contain" src={data?.imageUrl} alt="" />
            </div>
            <div className="lg:w-1/2 flex  justify-center items-center">
                <div>
                <h1 className="text-[38px] font-bold">Test Name: {data?.testName}</h1>
                <h1 className="text-[20px] font-medium">Test Description: {data?.details}</h1>
                <h1 className="text-[30px] font-bold">Reservation Last Date: {data?.date}</h1>
                <h1 className="text-[30px] font-bold">Total Available slots: {data?.slots}</h1>
                <h1 className="text-[30px] font-bold">Price: {data?.price}</h1>
                </div>
            </div>
        </div>
    );
};

export default TestDetails;