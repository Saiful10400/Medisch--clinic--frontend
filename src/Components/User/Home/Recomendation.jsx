import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosPublic from '../../custom Hooks/useAxiosPublic';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Recomendation = () => {
    const[data,setdata]=useState([])
    const axiosPublic=useAxiosPublic()
    useEffect(()=>{

        axiosPublic.get("/get_banner_data")
        .then(res=>setdata(res.data))
    },[])
    console.log(data)


    // swipper js handle.





    return (
        <div>
            


            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          data.map((item,idx)=><SwiperSlide key={idx} >
                 <div className="w-full h-[350px] lg:h-[600px]  relative">
        <img className="w-full h-full object-cover " src={item?.image} alt="" />
        <div className="w-full h-full  bg-gradient-to-r from-[#000000] to-[#ffffff40] text-white absolute top-0 left-0">
          <div className="lg:w-[1400px] h-full mx-auto  flex justify-center flex-col">
            <h1 className=" lg:mb-4 font-semibold text-3xl lg:text-[60px]">
              {item?.title}
            </h1>
            <div className="lg:w-[80px] w-[300px] mt-4 lg:mt-0 border-t-4 border-[#DC0003]"></div>
            <p className="lg:w-[670px] font-bold lg:font-normal mt-5 lg:my-[28px] lg:text-[25px]">{item?.recommendation}</p>
            
          </div>
        </div>
        </div>
            </SwiperSlide>)
        }
     
      </Swiper>






        </div>
    );
};

export default Recomendation;