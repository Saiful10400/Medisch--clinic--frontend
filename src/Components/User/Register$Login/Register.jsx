import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

// resoueces import.

import logo from "../../../../public/image/logo.png";
import Avatar from "../../../../public/image/registerAvatar.png";
import loading from "../../../../public/image/loading.gif";
import upload from "../../../../public/image/upload.jpg";
import { dataProvider } from "../../Context Api/DataProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../Authentication/firebase.config";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";



const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // input field styleingt.
  let inputStyle =
    "w-[290px] lg:w-[460px] h-[40px] py-[10px] px-[20px] text-base font-semibold bg-[#EBF5F5] focus:outline-none";
  let selectStyle =
    "w-[290px] lg:w-[460px] h-[40px] text-base font-semibold bg-[#EBF5F5] focus:outline-none";

  const { uploadUrl,signin,user } = useContext(dataProvider);
  const [error,setError]=useState(null)
  const axiosPublic=useAxiosPublic()


  // upazila manage state.
  // const [upazila,setUpazila]=useState([])
  const [district, setDistrict] = useState([]);
  const [upazila, setupazila] = useState([]);

  // fetching upazila and division data

  useEffect(() => {
    fetch("/division.json")
      .then((res) => res.json())
      .then((result) => {
        setDistrict(result);
      });
  }, []);

  // district handle
  const upazilaHandle = (event) => {
    const Selecteddistrict = event.target.value;
    const SelectedDistrictDetails = district.find(
      (item) => item.name === Selecteddistrict
    );


    fetch("/upazila.json")
      .then((res) => res.json())
      .then((result) => {
        const ourUPazila = result.filter(
          (item) => item.district_id === SelectedDistrictDetails.id
        );
        setupazila(ourUPazila);
      });
  };



  // profile handle.
  const [profile, setProfile] = useState(null);
  const [preload,setPreload]=useState(false)

  const profileHandle = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      setProfile(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  //   form handel
 

  const formHandle =  (data) => {
    setPreload(true)



    const password=data.password
    const confirmPassword=data.confirmPassword
    const bloodGroup=data.blood
    const district=data.district
    const upazila=data.upazila
    const email=data.email
    const name=data.name
    const role="user"
    const status="active"
 

    // console.log({bloodGroup,district,upazila,email,name})
 
    if(password === confirmPassword){
      signin(email,confirmPassword)
      .then(()=>{
        // ulloading photo into img bb.

         const file = data.file[0];
    const image=new FormData()
    image.append("image",file)

    fetch("https://api.imgbb.com/1/upload?key=a141acb20e39bec8f17a125bed57972b",{
      "method":"POST",
      body:image
    })
    .then(details=>details.json())
    .then(res=>{
      const photoUrl=res.data.display_url
      const UserName=name

      // upload into mongodb.

      axiosPublic.post("/post_user",{name,email,password,upazila,district,bloodGroup,photoUrl,role,status})
      .then(res=>{
        setPreload(false)
        console.log(res.data)
      })


      updateProfile(auth.currentUser,{
        displayName: UserName,
         photoURL:photoUrl
      })
      
    })



      })
    }
    else{
      setError("Confirm password hasn't mached.")

    }




    //  stetps1. upload photo into imgbb an then move farther.
 

    // const file = data.file[0];
    // const image=new FormData()
    // image.append("image",file)

    // fetch("https://api.imgbb.com/1/upload?key=a141acb20e39bec8f17a125bed57972b",{
    //   "method":"POST",
    //   body:image
    // })
    // .then(details=>details.json())
    // .then(res=>console.log(res.data.display_url))
  
  };

  return (
    <div>
      <div className={`w-full h-[calc(100vh-76px)] bg-white absolute z-20 flex justify-center items-center ${preload? "block" :"hidden"}`}>
      
        <img src={loading} alt="" />
      </div>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-76px)] relative z-0">
        <div className="lg:w-1/3  flex relative">
          <img
            className="absolute bottom-0 left-[50px] h-[483px] hidden lg:block"
            src={Avatar}
            alt=""
          />
          <div className="lg:w-2/3 bg-[#E12454] w-full lg:h-[calc(100vh-76px)]">
            <img className="lg:mt-[60px] py-6 ml-[30px]" src={logo} alt="" />
          </div>
          <div className="lg:w-2/3"></div>
        </div>
        {/* this willbe for form.  */}
        <div className="lg:w-1/2 flex justify-center items-center flex-col">
          <form
            onSubmit={handleSubmit(formHandle)}
            className="flex flex-col gap-[20px]"
          >
            {/* form tittle. */}
            <div className="mb-[15px] mt-[50px] lg:mt-0">
              <h1 className="text-[30px] lg:text-[36px] font-semibold">
                Register Now
              </h1>
              <h1 className="text-[14px] lg:text-[16px] font-normal">
                Register by entering the information below
              </h1>
            </div>
            <input
              {...register("name", { required: true })}
              className={inputStyle}
              type="text"
              placeholder="Your Name"
            />
            <input
              className={inputStyle}
              type="text"
              {...register("email", { required: true })}
              placeholder="Your Email"
            />
            <select
              {...register("district", { required: true })}
              onChange={upazilaHandle}
              defaultValue={"Select Your district."}
              className={selectStyle}
            >
              <option disabled>Select Your district.</option>
              {district.map((item, idx) => (
                <option
                  key={idx}
                  value={item.name}
                >{`${item.name} (${item.bn_name})`}</option>
              ))}
            </select>
            <select
              {...register("upazila", { required: true })}
              disabled={upazila.length < 1}
              defaultValue={"Select Your upazila."}
              className={selectStyle}
            >
              <option disabled>Select Your upazila.</option>
              {upazila?.map((item, idx) => (
                <option
                  key={idx}
                  value={`${item.name} (${item.bn_name})`}
                >{`${item.name} (${item.bn_name})`}</option>
              ))}
            </select>
            <select
              {...register("blood", { required: true })}
              defaultValue={"Select Your Blood group."}
              className={selectStyle}
            >
              <option disabled>Select Your Blood group.</option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            <input
              {...register("password", { required: true })}
              className={inputStyle}
              type="password"
              placeholder="Password"
            />
            <input
              {...register("confirmPassword", { required: true })}
              
              className={inputStyle}
              type="password"
              placeholder="Confirm Password"
            />
            <h1 className={`${error? "block" : "hidden"} text-red-500 font-bold text-lg`}>Error:{error}</h1>
            <div className="flex flex-col lg:flex-row justify-evenly items-center gap-3">
              <h1 className="font-bold text-lg">
                Upload Profile picture
              </h1>
              <input
                onInput={profileHandle}
                id="profile"
                {...register("file", { required: true })}
                type="file"
                className="file-input file-input-bordered w-3/4 hidden"
              />

              <label
                className="w-[150px] h-[100px] inline-block "
                htmlFor="profile"
              >
                {profile ? (
                  <img
                    className="w-full h-full border object-contain"
                    src={profile}
                    alt=""
                  />
                ) : (
                  <div className="w-full h-full  border-dotted border-2">
                    <img className="w-full h-full object-contain" src={upload} alt="" />
                  </div>
                )}{" "}
              </label>
            </div>
            <button
              className="btn w-[134px] h-[40px] text-base font-normal bg-[#E12454] text-white rounded-[30px]"
              type="submit"
            >
              Submit <FaArrowCircleRight className="text-xl" />
            </button>
          </form>
          <h1 className=" mt-[14px] mb-6 lg:mb-0 text-[14px] lg:text-[16px] font-normal">
            Already have an Account.{" "}
            <NavLink className="text-[#E12454]" to={"/login"}>
              Login Now
            </NavLink>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
