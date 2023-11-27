import { useEffect, useState } from "react";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [banner, setbanner] = useState(null);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/visibale_banner").then((res) => setbanner(res.data));
  }, []);
console.log(banner)
  return (
    <div>
      
      <div className="w-full h-[600px] relative">
        <img className="w-full h-full object-cover " src={banner?.url} alt="" />
        <div className="w-full h-full  bg-gradient-to-r from-[#000000] to-[#ffffff40] text-white absolute top-0 left-0">
          <div className="lg:w-[1400px] h-full mx-auto  flex justify-center flex-col">
            <h1 className="w-[476px] font-semibold text-[60px]">
              {banner?.title}
            </h1>
            <div className="w-[80px] border-t-4 border-[#DC0003]"></div>
            <p className="w-[670px] font-normal my-[28px] text-[25px]">{banner?.details}</p>
            <p className="text-xl mb-[15px]  font-bold">Use <span className="text-red-500">{banner?.couponName}</span> for <span>{banner?.couponRate} Tk off</span></p>
            <Link to={"/allTest"} className="btn btn-secondary w-[124px] h-[38px]">All tests</Link>
          </div>
        </div>

      </div>
       
    </div>
  );
};

export default Home;
