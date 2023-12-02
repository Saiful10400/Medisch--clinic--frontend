import { useEffect, useState } from "react";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Featured from "./Featured";
import Promotions from "./Promotions";
import Recomendation from "./Recomendation";

const Home = () => {
  const [banner, setbanner] = useState(null);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/visibale_banner").then((res) => setbanner(res.data));
  }, []);
 
  return (
    <div>
      
      <div className="w-full h-[300px]   lg:h-[600px]  relative">
        <img className="w-full h-full object-cover " src={banner?.url} alt="" />
        <div className="w-full h-full  bg-gradient-to-r from-[#000000] to-[#ffffff40] text-white absolute top-0 left-0">
          <div className="lg:w-[1400px] h-full mx-auto pl-2 lg:pl-0 flex justify-center flex-col">
            <h1 className=" lg:mb-4 font-semibold text-3xl lg:text-[60px]">
              {banner?.title}
            </h1>
            <div className="lg:w-[80px] w-[300px] mt-4 lg:mt-0 border-t-4 border-[#DC0003]"></div>
            <p className="lg:w-[670px] font-bold lg:font-normal mt-5 lg:my-[28px] lg:text-[25px]">{banner?.details}</p>
            <p className="lg:text-xl mb-[15px] text-base mt-4 lg:mt-0  font-bold">Use <span className="text-red-500">{banner?.couponName}</span> for <span>{banner?.couponRate} Tk off</span></p>
            <Link to={"/allTest"} className="btn btn-secondary btn-sm lg:btn-lg w-[124px] h-[38px]">All tests</Link>
          </div>
        </div>

      </div>
      <Featured></Featured>
      <Promotions></Promotions>
      <Recomendation></Recomendation>
       
    </div>
  );
};

export default Home;
