import { useEffect, useState } from "react";
import Shareds from "./Shareds";
import { CiUser } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTags } from "react-icons/fa";

const Blogs = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/blog.json")
      .then((res) => res.json())
      .then((result) => setData(result));
  }, []);
  console.log(data);
  return (
    <div>
      <Shareds name={"Blogs"} route={"Home / Blogs"}></Shareds>



      <div className="lg:w-[1400px] flex flex-col gap-11 lg:mx-auto my-6 ">
        {data.map((item, idx) => (
          <div key={idx} className="bg-[#ebf5f5] py-4 px-5">
            <h1 className="text-xl font-bold mb-5">Blog: {idx}</h1>
            <h1 className="font-bold text-3xl mb-2">{item.blogTitle}</h1>
            <div className="flex items-center lg:gap-10 mb-14">
              <span className="flex gap-2">
                <CiUser /> {item.authorName}
              </span>{" "}
              <span className="flex gap-2">
                <GoComment /> Comment {item.comments}
              </span>{" "}
              <span className="flex gap-2">
                {" "}
                <FaCalendarAlt /> {item.date}
              </span>
            </div>
            <p className="font-normal text-lg">{item.blogDetails}</p>
            <hr />
            <div className="flex items-center justify-start gap-10 py-10">
            <span className="text-xl"><FaTags /></span>
            <div className="flex lg:flex-row flex-col gap-3">
                {
                    item.blogTags.map((tag,idx)=><span className="bg-gray-600 text-white px-1 rounded-md" key={idx}>{tag}</span>)
                }
            </div>
            

            </div>
            <div className="flex justify-evenly py-3 bg-gray-400 rounded-lg items-center ">
                <img src={item.authorImage} className="w-[100px] h-[100px] object-contain rounded-full" alt="" />
                <div>
                    <h1 className="text-gray-100 font-extrabold text-2xl">About: {item.authorName}</h1>
                    <p className="font-bold text-lg">{item.authorAbout}</p>
                </div>
            </div>
          </div>
        ))}


      </div>
    </div>
  );
};

export default Blogs;
