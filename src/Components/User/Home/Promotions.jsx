import doc1 from "../../../../public/image/doc1.webp";
import doc2 from "../../../../public/image/doc2.webp";
import doc3 from "../../../../public/image/doc3.webp";

import { FaVirusCovid } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Promotions = () => {
  return (
    <div className="lg:my-[100px] pb-7 bg-[#ebf5f5]">
      <div className="mx-auto lg:w-[1400px]">
        <h1 className="text-center text-[40px] text-[#e12454]">Our Services</h1>
        <h1 className="text-center text-[30px] font-bold text-black my-3">
        Special High-quality Services
        </h1>
        <p className="text-center text-base text-[#808080]">
          It is a long established fact that a reader will be distracted by the
          readable <br /> content of a page when looking at its layout.
        </p>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 lg:mx-0 mx-6 mt-5">
          <div className="w-full p-[40px] bg-white text-center flex flex-col justify-center items-center gap-6  transition-all duration-500">
            <div className="text-5xl text-red-600">
              <FaVirusCovid></FaVirusCovid>
            </div>
            <h1 className="text-2xl font-bold">Covid -19</h1>
            <p className="text-lg">
              It is a long established fact that a reader will be distracted by
              the readable the content of a page when looking.
            </p>
            <button className="flex items-center gap-3 bg-red-500 btn text-white rounded-full">
              Book Now{" "}
              <MdKeyboardDoubleArrowRight className="bg-red-300 rounded-full text-3xl" />
            </button>
          </div>


          <div className="w-full p-[40px] bg-white text-center  flex flex-col justify-center items-center gap-6  transition-all duration-500">
            <div className="text-5xl text-red-600">
              <FaUserDoctor></FaUserDoctor>
            </div>
            <h1 className="text-2xl font-bold">Full Stathoscope</h1>
            <p className="text-lg">
              It is a long established fact that a reader will be distracted by
              the readable the content of a page when looking.
            </p>
            <button className="flex items-center gap-3 bg-red-500 btn text-white rounded-full">
              Book Now{" "}
              <MdKeyboardDoubleArrowRight className="bg-red-300 rounded-full text-3xl" />
            </button>


          </div>


          <div className="w-full p-[40px] bg-white text-center flex flex-col justify-center items-center gap-6  transition-all duration-500">
            <div className="text-5xl text-red-600">
              <FaHeartbeat></FaHeartbeat>
            </div>
            <h1 className="text-2xl font-bold">Heart Specialest</h1>
            <p className="text-lg">
              It is a long established fact that a reader will be distracted by
              the readable the content of a page when looking.
            </p>
            <button className="flex items-center gap-3 bg-red-500 btn text-white rounded-full">
              Book Now{" "}
              <MdKeyboardDoubleArrowRight className="bg-red-300 rounded-full text-3xl" />
            </button>
          </div>
          {/* <div className="w-full p-[40px] text-center  hover:bg-[#e12454] transition-all duration-500">
            <img src={doc1} className="w-full object-contain " alt="" />
            <h1 className="text-[22px] font-bold mt-5">Dr. Ali banat</h1>
            <h1 className="text-base mt-2">Psychiatrist</h1>
 
        </div> */}
          {/* <div className="w-full p-[40px] text-center  hover:bg-[#e12454] transition-all duration-500">
            <img src={doc2} className="w-full object-contain " alt="" />
            <h1 className="text-[22px] font-bold mt-5">Dr. Hisham</h1>
            <h1 className="text-base mt-2">Psychiatrist</h1>
 
        </div>
        <div className="w-full p-[40px] text-center  hover:bg-[#e12454] transition-all duration-500">
            <img src={doc1} className="w-full object-contain " alt="" />
            <h1 className="text-[22px] font-bold mt-5">Dr. Ali Hasnat</h1>
            <h1 className="text-base mt-2">Hepatologist</h1>
 
        </div>
        <div className="w-full p-[40px] text-center  hover:bg-[#e12454] transition-all duration-500">
            <img src={doc3} className="w-full object-contain " alt="" />
            <h1 className="text-[22px] font-bold mt-5">Dr. Milina</h1>
            <h1 className="text-base mt-2">Oncologist</h1>
 
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
