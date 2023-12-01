import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { dataProvider } from "../../Context Api/DataProvider";
import logo from "../../../../public/image/logo.webp";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../custom Hooks/useAxiosPublic";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user, logout } = useContext(dataProvider);

  // admin route check.
  const axiosPublic = useAxiosPublic();
  const {
    data: userdata,
    refetch,
    isPending: isLoading,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get_users_admin`);
      const data = res.data;
      const actualUser = data.find(
        (item) => item?.email.toUpperCase() === user?.email.toUpperCase()
      );
      console.log(actualUser);
      return actualUser;
    },
  });
  console.log(userdata)

  const li = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
      {
        userdata?.role==="admin" && <li>
        <NavLink to={"/adminDashbord/allUsers"}>Admin Dashbord</NavLink>
      </li>
      }
      {
        user && <li>
        <NavLink to={"/UserDashbord/myProfile"}>Dashbord</NavLink>
      </li>
      }
      <li>
        <NavLink to={"/Doctors"}>Doctors</NavLink>
      </li>
      <li>
        <NavLink to={"/Blogs"}>Blogs</NavLink>
      </li>
      <li>
        <NavLink to={"/Contact"}>Contact</NavLink>
      </li>
    </>
  );

  // logout handle.

  const logoutHandle = () => {
    logout();
  };
  window.onclick = () => setShow(false);
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
          <a className="btn btn-ghost text-xl">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-6 text-lg">{li}</ul>
        </div>

        {/* end side logo and name. */}
        <div className="navbar-end flex gap-1 relative">
          <button
            disabled={user ? false : true}
            onClick={(e) => {
              setShow(!show);
              e.stopPropagation();
            }}
            className="w-[60px] h-[60px] rounded-full border-2 "
          >
            <img
              src={
                user?.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/219/219983.png"
              }
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          </button>

          <div
            className={`w-[250px] rounded-xl h-[250px] absolute top-[76px] right-0 z-50 bg-[#e12453] ${
              show ? "" : "hidden"
            } flex flex-col items-center gap-4`}
          >
            <h1 className="mt-4 font-bold text-white">
              Name: {user?.displayName}
            </h1>
            <h1 className="  font-bold text-white">E-mail: {user?.email}</h1>
            {user && (
              <button onClick={logoutHandle} className="btn  btn-primary">
                logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
