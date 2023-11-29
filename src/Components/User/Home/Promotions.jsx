import doc1 from "../../../../public/image/doc1.webp"
import doc2 from "../../../../public/image/doc2.webp"
import doc3 from "../../../../public/image/doc3.webp"



const Promotions = () => {
  return (
    <div className="lg:w-[1400px] mx-auto lg:my-[100px]">
      <h1 className="text-center text-[40px] text-[#e12454]">Our Team</h1>
      <h1 className="text-center text-[30px] font-bold text-black my-3">Our Dedicated Doctors</h1>
      <p className="text-center text-base text-[#808080]">
        It is a long established fact that a reader will be distracted by the
        readable <br /> content of a page when looking at its layout.
      </p>
      <div className="grid lg:grid-cols-4 grid-cols-1">
        <div className="w-full p-[40px] text-center  hover:bg-[#e12454] transition-all duration-500">
            <img src={doc1} className="w-full object-contain " alt="" />
            <h1 className="text-[22px] font-bold mt-5">Dr. Ali banat</h1>
            <h1 className="text-base mt-2">Psychiatrist</h1>
 
        </div>
        <div className="w-full p-[40px] text-center  hover:bg-[#e12454] transition-all duration-500">
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
 
        </div>
      </div>
    </div>
  );
};

export default Promotions;
