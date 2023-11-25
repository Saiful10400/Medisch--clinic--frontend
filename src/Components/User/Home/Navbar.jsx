import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { dataProvider } from "../../Context Api/DataProvider";

const Navbar = () => {
  const{user,logout}=useContext(dataProvider)
  const li = (
    <>
      <li><NavLink to={"/"}>Home</NavLink></li>
      <li><NavLink to={"/login"}>Login</NavLink></li>
      <li><NavLink to={"/adminDashbord/allUsers"}>Admin Dashbord</NavLink></li>
      <li><NavLink to={"/Dashbord"}>Dashbord</NavLink></li>
    </>
  );

 

  // logout handle.

  const logoutHandle=()=>{
    logout()
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {li}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-6 text-lg">{li}</ul>
        </div>

        {/* end side logo and name. */}
        <div className="navbar-end flex gap-1">
         <div className="w-[50px] h-[50px]">
          <img src={user?.photoURL} className="w-full h-full object-contain" alt="" />
         </div>
         <h1>{user?.displayName}</h1>
         <button onClick={logoutHandle} className="btn btn-sm btn-primary">logout</button>
        </div>


      </div>
    </div>
  );
};

export default Navbar;
