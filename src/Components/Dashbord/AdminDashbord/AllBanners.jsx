import React from "react";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";


const AllBanners = () => {
  const axiosPublic = useAxiosPublic();

  // const{data:users=[],refetch}=useQuery({
  //     queryKey:['users'],
  //     queryFn:async()=>{
  //       const res=await axiosPublic.get("/get_users")
  //       return res.data
  //     }
  //   })

  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/get_banners");
      return res.data;
    },
  });

//   banner Visibility handle.
const VisibilityHandle=(bannerData)=>{
    const bannerId=bannerData._id
   axiosPublic.patch("/banner_update",{bannerId})
   .then(()=>{
 
    refetch()
   })

}

 //  banner delete handle.
 const bannerDeleteHandle=(arg)=>{
  axiosPublic.post("/delete_banner",{id:arg._id})
  .then(res=>{
    console.log(res)
    refetch()
  })
}

  return (
    <div className="w-[100vw] lg:w-[60vw] mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Title</th>
              <th>status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((item, idx) => (
              <tr key={idx}>
                <th>{++idx}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.url}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="font-bold">{item.title}</span>
                </td>
                <td className="flex flex-col justify-center items-center gap-2 lg:flex-row">
                  <span className="bg-yellow-400 font-semibold rounded-lg lg:text-base p-1 lg:p-2">
                    {item.couponName}
                  </span>{" "}
                  for{" "}
                  <span className="font-normal bg-green-400 rounded-lg p-1">
                    {item.couponRate}Taka
                  </span>
                </td>

                <th><button onClick={()=>VisibilityHandle(item)} className={`btn ${item.isActive ? "btn-error" : "btn-primary"}`}>{item.isActive ? "Visible" : "Hidden"}</button></th>
                <th>
                  <button onClick={()=>bannerDeleteHandle(item)} className="btn btn-outline btn-error text-xl">
                    <MdDeleteForever />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
         
        </table>
      </div>
    </div>
  );
};

export default AllBanners;
