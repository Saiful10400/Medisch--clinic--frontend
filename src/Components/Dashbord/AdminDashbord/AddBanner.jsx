import { useState } from "react";
import { useForm } from "react-hook-form";
import upload from "../../../../public/image/upload.jpg";
import { FaCloudUploadAlt } from "react-icons/fa";
 import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

const AddBanner = () => {
 
  let inputStyle =
    "w-[290px] lg:w-[460px] h-[40px] py-[10px] px-[20px] text-base font-semibold bg-[#EBF5F5] focus:outline-none rounded-md";
    

  // use form hoocks.

  const axiosPublic=useAxiosPublic()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // profilehandle
  const [profile, setProfile] = useState(null);
  const profileHandle = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      setProfile(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // form handle.

  const formhandle = (data) => {
    const name = data.name;
    const title = data.title;
    const couponName = data.couponName;
    const couponRate = parseInt(data.couponRate);
    const details = data.description;
    const file = data.file[0];
    const isActive=false

    // steps. post data to imgbb.then procede

    const image=new FormData()
    image.append("image",file)

    fetch("https://api.imgbb.com/1/upload?key=a141acb20e39bec8f17a125bed57972b",{
      "method":"POST",
      body:image
    })
    .then(details=>details.json())
    .then(res=>{
        // post into monbodb after successfull imgbb deploy.
        if(res.data.display_url){
            const url=res.data.display_url
            axiosPublic.post("/post_banner",{name,title,couponName,couponRate,details,isActive,url})
            .then(res=>console.log(res.data))
        }
    })
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(formhandle)}
        className="flex flex-col gap-[23px]"
      >
        <input
          {...register("name", { required: true })}
          className={inputStyle}
          type="text"
          placeholder="Name"
        />
        <input
          {...register("title", { required: true })}
          className={inputStyle}
          type="text"
          placeholder="Title"
        />
        <input
          {...register("couponName", { required: true })}
          className={inputStyle}
          type="text"
          placeholder="Coupon code name"
        />
        <input
          {...register("couponRate", { required: true })}
          className={inputStyle}
          type="number"
          placeholder="Coupon rate"
        />
        <textarea
          {...register("description", { required: true })}
          className={`${inputStyle} h-[210px]`}
          type="text"
          placeholder="Description"
        />

        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-3">
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
        </div>
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

export default AddBanner;
