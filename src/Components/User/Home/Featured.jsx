import { useContext, useEffect, useState } from "react";
import { dataProvider } from "../../Context Api/DataProvider";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

// swipper js.
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { NavLink } from "react-router-dom";

// Import Swiper styles

const Featured = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(dataProvider);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) {
      axiosPublic
        .get(`/booked_data?email=${user?.email}`)
        .then((res) => setData(res.data));
    }
  }, [user, axiosPublic]);

  console.log(data);

  // swipper js .
   

  return (
    <>
      <div className="lg:w-[1400px] mx-auto ">
        <h1 className="text-center font-bold text-3xl mb-4 lg:text-5xl underline  mt-10">
          Featured Tests
        </h1>
      </div>

      {/* slider */}
      <div className={data.length<1 ? "" : "hidden"}>
      <h1 className="text text-xl lg:text-3xl font-bold text-center my-[30px] lg:mt-[100px]">No booked test available!! <br /> Go and <NavLink className="btn btn-sm lg:btn-lg btn-secondary" to={"/allTest"}>Book here</NavLink></h1>

      </div>
       
          <div className={data.length>=1 ? "" : "hidden"}>
          <Swiper
             
             breakpoints={{
               // when window width is >= 640px
               640: {
                 width: 640,
                 slidesPerView: 1,
               },
               // when window width is >= 768px
               768: {
                 width: 768,
                 slidesPerView: 2,
               },
             }}
             spaceBetween={30}
             autoplay={{
               delay: 3000,
               disableOnInteraction: false,
             }}
             pagination={{
               clickable: true,
             }}
             modules={[Pagination, Autoplay]}
             className="w-[96%]"
           >
             {data.map((item) => (
               <SwiperSlide key={item._id}>
                 {/* <img className="w-36 h-36 object-cover rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" alt="" />
                 <p className="lg:text-3xl text-base mt-3">Olivia Thompson</p>
                 <p className="lg:text-xl text-sm font-extrabold text-gray-500">Event Coordinator</p> */}
 
                 <div className="card h-[250px]  bg-base-100 shadow-xl image-full">
                   <figure className="w-full h-full">
                     <img
                       className="w-full h-full object-contain"
                       src={item.imgUrl}
                       alt="Shoes"
                     />
                   </figure>
                   <div className="card-body ">
                     <h2 className="card-title">{item.name}</h2>
                     <div className="mt-[20px] font-bold text-white">
                     <p>Reservation last date: {item.date}</p>
                     <p>Price: {item.price-item.discount}</p>
                     <p>Report: {item.report?"Available" : "Pending"}</p>
                     </div>
                     
                   </div>
                 </div>
               </SwiperSlide>
             ))}
           </Swiper>
          </div>
         
    </>
  );
};

export default Featured;
