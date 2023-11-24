import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";


// resoueces import.

import logo from "../../../../public/image/logo.png"
import Avatar from "../../../../public/image/registerAvatar.png"









const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // input field styleingt.
  let inputStyle =
    "w-[290px] lg:w-[460px] h-[40px] py-[15px] px-[20px] text-base font-semibold bg-[#EBF5F5] focus:outline-none";
  let selectStyle =
    "w-[290px] lg:w-[460px] h-[40px] text-base font-semibold bg-[#EBF5F5] focus:outline-none";

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
    console.log(SelectedDistrictDetails);

    fetch("/upazila.json")
      .then((res) => res.json())
      .then((result) => {
        const ourUPazila = result.filter(
          (item) => item.district_id === SelectedDistrictDetails.id
        );
        setupazila(ourUPazila);
      });
  };

  //   password field handle.

  const passwordHandle = (event) => {
    const password = event.target.value;
    console.log(password);
  };



//   form handel

const formHandle=data=>{

console.log(data.email)
}

  return (
    <div>
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="w-1/2 flex relative">
            <img className="absolute bottom-0 left-[50px] h-[483px] hidden lg:block" src={Avatar} alt="" />
            <div className="w-1/2 bg-[#E12454] h-screen">
                <img className="mt-[60px] ml-[30px]" src={logo} alt="" />
            </div>
            <div className="w-1/2"></div>
        </div>
        {/* this willbe for form.  */}
        <div className="w-1/2 flex justify-center items-center flex-col">



          <form onSubmit={handleSubmit(formHandle)} className="flex flex-col gap-[20px]">
            {/* form tittle. */}
            <div className="mb-[15px]">
              <h1 className="text-[30px] lg:text-[36px] font-semibold">
                Register Now
              </h1>
              <h1 className="text-[14px] lg:text-[16px] font-normal">
                Register by entering the information below
              </h1>
            </div>
            <input {...register("name",{required:true})} className={inputStyle} type="text" placeholder="Your Name" />
            <input
              className={inputStyle}
              type="text" {...register("email",{required:true})}
              placeholder="Your Email"
            />
            <select
            {...register("district",{required:true})}
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
            {...register("upazila",{required:true})}
              disabled={upazila.length < 1}
              defaultValue={"Select Your upazila."}
              className={selectStyle}
            >
              <option disabled>Select Your upazila.</option>
              {upazila?.map((item, idx) => (
                <option
                  key={idx}
                  value={item.name}
                >{`${item.name} (${item.bn_name})`}</option>
              ))}
            </select>
            <select {...register("blood",{required:true})}
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
            <input {...register("password",{required:true})}
              className={inputStyle}
              type="password"
              placeholder="Password"
            />
            <input {...register("confirmPassword",{required:true})}
              onInput={passwordHandle}
              className={inputStyle}
              type="password"
              placeholder="Confirm Password"
            />
            <button className="btn w-[134px] h-[40px] text-base font-normal bg-[#E12454] text-white rounded-[30px]" type="submit">Submit <FaArrowCircleRight className="text-xl" /></button>
          </form>
          <h1 className=" mt-[14px] text-[14px] lg:text-[16px] font-normal">Already have an Account. <NavLink className="text-[#E12454]" to={"/login"}>Login Now</NavLink></h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
