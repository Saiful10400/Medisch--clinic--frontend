import { useContext, useEffect, useState } from "react";
import { dataProvider } from "../../Context Api/DataProvider";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

// swipper js.
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";

const Featured = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(dataProvider);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user) {
      axiosPublic
        .get(`/booked_data?email=${user.email}`)
        .then((res) => setData(res.data));
    }
  }, [user, axiosPublic]);

  console.log(data);

  // swipper js .

  return (
    <div className="lg:w-[1400px] mx-auto overflow-x-hidden lg:overflow-auto">
      <h1 className="text-center font-bold text-5xl underline  mt-10">
        Featured Tests
      </h1>

      <div className="mt-10 w-[1000px] lg:w-auto ">
        <Swiper
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            type: "fraction",
          }}
          navigation={false}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide   key={item._id}>
              <div className="card w-full bg-base-100 shadow-xl image-full">
                <figure className="w-full h-[200px]">
                  <img className="w-full object-contain"
                    src={item.imgUrl}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <p>price: {item.price}tk</p>
                  <p>Checkout with in: {item.date}</p>
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Featured;
