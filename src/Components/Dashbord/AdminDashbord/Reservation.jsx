import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Reservation = () => {
  
  const axiosPublic = useAxiosPublic();
  const[array,setArray]=useState([])
  useEffect(()=>{
    axiosPublic.get("/get_all_bookedData")
    .then(res=>setArray(res.data))
  },[axiosPublic])

  // const { data: data = [], refetch } = useQuery({
  //   queryKey: ["booked data"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get("/get_all_bookedData");
  //     return res.data;
  //   },
  // });
 

 
  const [id, setId] = useState("");
  // cv link past handle.

  const CvLInkPastHandle = (e) => {
    e.preventDefault();
    const link = e.target.cvLink.value;

    if (link.split("").length >= 1) {
      axiosPublic.post("/update_cv_link", { link, id }).then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Posted successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        // refetch
        window.location.reload()
        e.target.reset();
      });
    }
  };
  // reservation cancel handle.
  const deleteHandle = (res) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.post("/delete_booked_test", { id: res._id }).then(() => {
          // refetch
          window.location.reload()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deletion Seccessfull",
            showConfirmButton: false,
            timer: 1500,
          });
        });

        Swal.fire({
          title: "Deleted!",
          text: "Reservation deleted.",
          icon: "success",
        });
      }
    });
  };

  // search handle.
  const searchHandle=(e)=>{
    e.preventDefault()
    const email=e.target.emailfield.value
    console.log(email)
    if(email.length>=1){
      const filterdata=array?.filter(item=>item.userEmail===email)
    setArray(filterdata)
    }

  }

  return (
    <div>
      <div className="mb-7">
        <form onSubmit={searchHandle} className=" h-[40px] flex justify-center items-center gap-2">
          <input
            className="focus:outline-none border-2 h-full px-2 border-black rounded-lg"
            type="text" placeholder="Enter user email"
            name="emailfield"
          />{" "}
          <button className="btn btn-secondary btn-sm h-full">Search</button>
        </form>
      </div><hr />
      <div className="overflow-x-auto w-[100vw] lg:w-[60vw] mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th></th>
              <th>User</th>
              <th>Booked Test</th>
              <th>Paid</th>
              <th>Report</th>
              <th>Paid</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {array.map((item, idx) => (
              <tr key={idx}>
                <th></th>

                <td>
                  {item.userName}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item.userEmail}
                  </span>
                </td>
                <td>{item.name}</td>
                <td>{item.price - item.discount} Tk</td>
                <td>
                  <span
                    className={` font-bold p-1 rounded-md ${
                      item.report ? "bg-green-500 text-white" : "bg-white"
                    }`}
                  >
                    {item.report ? "Delevered" : "Pending"}
                  </span>
                </td>
                <td className="flex gap-2">
                  <form onSubmit={CvLInkPastHandle}>
                    <input
                      className="focus:outline-none border-2 rounded-md pl-2"
                      placeholder="Past report link."
                      type="text"
                      name="cvLink"
                    />{" "}
                    <button
                      type="submit"
                      onClick={() => setId(item._id)}
                      className={`btn btn-primary btn-sm ${
                        item.report ? "bg-red-500 text-white border-none" : ""
                      }`}
                    >
                      {item.report ? "Resubmit" : "Submit"}
                    </button>
                  </form>
                </td>
                <th>
                  <button
                    onClick={() => deleteHandle(item)}
                    className="btn  btn-xs btn-warning"
                  >
                    cancel
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default Reservation;
