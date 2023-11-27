import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AllTest = () => {
  const axiosPublic = useAxiosPublic();
  const[modal,setModal]=useState(null)

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/get_test");
      return res.data;
    },
  });
 

  // update handle.
  const updateHandle = (arg) => {
    // axiosPublic.patch("/update_test", { id: arg._id }).then((res) => {
    //   console.log(res);
    //   refetch();
    // });
    setModal(arg)
    
    document.getElementById('my_modal_3').showModal()

  };

  //   dlete handle.

  const deleteHandle = (arg) => {
    axiosPublic.post("/delete_test", { id: arg._id }).then((res) => {
      refetch();
      console.log(res.data);
    });
  };
  let inputStyle =
  "w-[290px] lg:w-[460px] h-[40px] py-[10px] px-[20px] text-base font-semibold bg-[#EBF5F5] focus:outline-none rounded-md";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
//   modal handle.
const navigate=useNavigate()
const modalHandle=(data)=>{

    const testName=data.testName
    const price=parseInt(data.price)
    const imageUrl=data.imgUrl
    const details=data.description
    let date=data.date
    date=date.split("-")
    date=date[2]+"-"+date[1]+"-"+date[0]
    let slots=parseInt(data.slots)
    const id=modal._id
 

   if(testName && price && imageUrl && details && date && slots){
    axiosPublic.post("/update_test",{testName,price,imageUrl,details,date,slots,id})
   .then(res=>{
    console.log(res.data)
    refetch()
    alert("done")
   })
   }


}

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Details</th>
              <th>Slots</th>
              <th>Price</th>
              <th>Reservation</th>
              <th>Last date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, idx) => (
              <tr key={idx}>
                <th>{++idx}</th>
                <td>{item.testName}</td>
                <td>{item.details}</td>
                <td>{item.slots}</td>
                <td>{item.price} Tk</td>
                <td className="text-center">{item.reservation}</td>
                <td>{item.date}</td>
                <td>
                  <button
                    onClick={() => deleteHandle(item)}
                    className="btn btn-sm btn-warning"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => updateHandle(item)}
                    className="btn btn-sm btn-success"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal page. */}


<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    



    <form
        onSubmit={handleSubmit(modalHandle)}
        className="flex flex-col gap-[23px]"
      >
        <input
          {...register("testName", )}
          className={inputStyle}
          type="text"
          placeholder="Test name"
          defaultValue={modal?.testName}
         
        />
        <input
          {...register("imgUrl" )}
          className={inputStyle}
          type="text"
          placeholder="Img url"
          defaultValue={modal?.imageUrl}
        />
         
        <input
          {...register("price" )}
          className={inputStyle}
          type="number"
          placeholder="Price"
          defaultValue={modal?.price}
        />
        <input
          {...register("slots" )}
          className={inputStyle}
          type="number"
          placeholder="Slots"
          defaultValue={modal?.slots}
        />
        <textarea
          {...register("description")}
          className={`${inputStyle} h-[240px]`}
          type="text"
          placeholder="Details"
          defaultValue={modal?.details}
        />
        <input  {...register("date")} type="date" />
        <button
          type="submit"
          className="flex justify-center items-center gap-5 text-lg btn btn-primary"
        >
          <FaCloudUploadAlt></FaCloudUploadAlt>Upload
        </button>
      </form>




  </div>
</dialog>





    </div>
  );
};

export default AllTest;




// defaultValue={modal?.date.split("-")[2]+"-"+modal?.date.split("-")[1]+"-"+modal?.date.split("-")[0] }