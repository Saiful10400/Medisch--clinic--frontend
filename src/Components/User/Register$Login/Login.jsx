import { FaArrowCircleRight, FaFacebook, FaGoogle } from "react-icons/fa";
import logo from "../../../../public/image/logo.png";
import Avatar from "../../../../public/image/registerAvatar.png";
import google from "../../../../public/image/google.png";
import facebook from "../../../../public/image/facebook.png";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { dataProvider } from "../../Context Api/DataProvider";

const Login = () => {
  const[error,seterror]=useState(null)
  const move=useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

// constxt api data.
const{user,googleLogin,emailLogin,facebookLogin,}=useContext(dataProvider)
console.log(user)


  // input field styleingt.
  let inputStyle =
    "w-[290px] lg:w-[460px] h-[40px] py-[10px] px-[20px] text-base font-semibold bg-[#EBF5F5] focus:outline-none";

  //   form handle.

  const formHandle = (data) => {
    const email=data.email
    const password=data.password

    emailLogin(email,password)
    .then(()=>move("/"))
    .catch(err=>{
      seterror(err.message.split(":")[1].split(" ")[2])
    })

  };


  // google lobin.
  const googlehadle=()=>{
    googleLogin()
  }

  // facebook login.
  const facebookhandle=()=>{
    facebookLogin()

  }

  return (
    <div>
      <div>
        <div className="flex flex-col lg:flex-row h-[calc(100vh-76px)]">
          <div className="lg:w-1/3 flex relative">
            <img
              className="absolute bottom-0 left-[50px] h-[483px] hidden lg:block"
              src={Avatar}
              alt=""
            /> 
            <div className="lg:w-1/2 w-full  bg-[#E12454] lg:h-[calc(100vh-76px)]">
              <img className="py-5 lg:py-0 lg:mt-[60px] ml-[30px]" src={logo} alt="" />
            </div>
            <div className="hidden lg:block w-1/2"></div>
          </div>
          {/* this willbe for form.  */}
          <div className="lg:w-2/3 flex justify-center items-center flex-col">
            <div>
              <form
                onSubmit={handleSubmit(formHandle)}
                className="flex flex-col gap-[20px]"
              >
                {/* form tittle. */}
                <div className="mb-[15px] mt-[50px] lg:mt-0">
                  <h1 className="text-[30px] lg:text-[36px] font-semibold">
                    Welcome Back
                  </h1>
                  <h1 className="text-[14px] lg:text-[16px] font-normal">
                    Login by entering the information below
                  </h1>
                </div>
                <input onClick={()=>seterror(null)}
                  className={inputStyle}
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="Your Email"
                />

                <input onClick={()=>seterror(null)}
                  {...register("password", { required: true })}
                  className={inputStyle}
                  type="password"
                  placeholder="Password"
                />
                <p className={`font-bold text-red-600 ${error?"":"hidden"}`}>{error}</p>

                <button
                  className="btn w-[134px] h-[40px] text-base font-normal bg-[#E12454] text-white rounded-[30px]"
                  type="submit"
                >
                  Login <FaArrowCircleRight className="text-xl" />
                </button>
              </form>
              <h1 className=" mt-[14px] text-[14px] lg:text-[16px] font-normal">
                Or you can
                <NavLink className="text-[#E12454] ml-1" to={"/register"}>
                  Register
                </NavLink>
              </h1>

              <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">Or</div>
                <h1 className="text-base font-normal text-[#808080] mb-[16px]">
                  Login with -
                </h1>
                <div className="flex items-center gap-[15px]">
                  <button onClick={googlehadle} className="w-[50px] h-[50px]">
                    <img className="w-full h-full" src={google} alt="" />
                  </button>
                  <button onClick={facebookhandle} className="w-[47px] h-[47px]">
                    <img className="w-full h-full" src={facebook} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
