import { FaCloudUploadAlt } from "react-icons/fa";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";


const AddTest = () => {
    let inputStyle =
    "w-[290px] lg:w-[460px] h-[40px] py-[10px] px-[20px] text-base font-semibold bg-[#EBF5F5] focus:outline-none rounded-md";
    const axiosPublic=useAxiosPublic()


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    // form handle.

    const formhandle = (data) => {
       const testName=data.testName
       const price=parseInt(data.price)
       const imageUrl=data.imgUrl
       const details=data.description
       let date=data.date
       date=date.split("-")
       date=date[2]+"-"+date[1]+"-"+date[0]
       let slots=parseInt(data.slots)
       const reservation=parseInt(0)
       
     
       axiosPublic.post("/Add_test",{testName,price,imageUrl,details,date,slots,reservation})
       .then(res=>console.log(res.data))
      };
    return (
        <div>
            <form
        onSubmit={handleSubmit(formhandle)}
        className="flex flex-col gap-[23px]"
      >
        <input
          {...register("testName", { required: true })}
          className={inputStyle}
          type="text"
          placeholder="Test name"
        />
        <input
          {...register("imgUrl", { required: true })}
          className={inputStyle}
          type="text"
          placeholder="Img url"
        />
         
        <input
          {...register("price", { required: true })}
          className={inputStyle}
          type="number"
          placeholder="Price"
        />
        <input
          {...register("slots", { required: true })}
          className={inputStyle}
          type="number"
          placeholder="Slots"
        />
        <textarea
          {...register("description", { required: true })}
          className={`${inputStyle} h-[240px]`}
          type="text"
          placeholder="Details"
        />
        <input {...register("date",{required:true})} type="date" />

        {/* <div className="flex flex-col lg:flex-row justify-evenly items-center gap-3">
          <input
            onInput={profileHandle}
            id="profile"
            {...register("file", { required: true })}
            type="file"
            className="file-input file-input-bordered w-3/4 hidden"
          />

          <label className="w-full h-[200px] inline-block " htmlFor="profile">
            {profile ? (
              <img
                className="w-full h-full border object-contain"
                src={profile}
                alt=""
              />
            ) : (
              <div className="w-full h-full  border-dotted border-2">
                <img
                  className="w-full h-full object-contain"
                  src={upload}
                  alt=""
                />
              </div>
            )}{" "}
          </label>
        </div> */}
        <button
          type="submit"
          className="flex justify-center items-center gap-5 text-lg btn btn-primary"
        >
          <FaCloudUploadAlt></FaCloudUploadAlt>Upload
        </button>
      </form>
        </div>
    );
};

export default AddTest;