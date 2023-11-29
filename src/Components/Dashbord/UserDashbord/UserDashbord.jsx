import { IoHomeSharp } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

const UserDashbord = () => {
  const liststyle="text-white text-xl"
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
        <div className="mt-[70px] lg:w-full  lg:mt-0">
          <Outlet></Outlet>
         </div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button rounded-none lg:hidden fixed w-full  top-0 left-0"
          >
          <span className="flex gap-3 items-center text-xl"> <span className="text-3xl"><IoMdMenu /></span> Menu</span>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full  bg-error text-base-content">
            {/* Sidebar content here */}
            <li className={liststyle}>
              <NavLink to={"/"}>
                <IoHomeSharp></IoHomeSharp>
              </NavLink>
            </li>
            <li className={liststyle}>
              <NavLink to={"myProfile"}>My profile</NavLink>
            </li>
            <li className={liststyle}>
              <NavLink to={"upcomingAppoinment"}>Upcoming appoinment</NavLink>
            </li>
            <li className={liststyle}>
              <NavLink to={"testResult"}>Test result</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashbord;
