import { useEffect, useState } from "react";
import Shareds from "./Shareds";

const Doctors = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("/doctor.json")
      .then((res) => res.json())
      .then((result) => setdata(result));
  }, []);
  console.log(data);
  return (
    <div>
      <Shareds name={"Our Team"} route={"Home / Our team"}></Shareds>
      <div className="lg:w-[1400px]  mx-auto grid gap-4 items-center grid-cols-1 lg:grid-cols-3 px-4 py-11 lg:px-0">
        {data?.map((item, idx) => (
          <div key={idx} className="w-[370px] h-[400px] rounded-lg   bg-gray-300 relative ">
            <img className="w-full h-full object-contain" src={item.image} alt="" />
            <div className="w-full h-[60px] bg-[#e12454] absolute bottom-0 left-0  flex flex-col justify-center items-center text-white">
                <h1 className="font-bold text-xl">{item.doctorName}</h1>
                <h1 className="font-normal">{item.specialty}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
