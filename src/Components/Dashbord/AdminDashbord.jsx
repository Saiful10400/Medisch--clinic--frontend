import { NavLink, Outlet } from "react-router-dom";

// all react imporetd icons.
import { LuImagePlus } from "react-icons/lu";
import { FaRegImages } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";

const AdminDashbord = () => {
  // list style.
  const liststyle="text-white text-xl"
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
         <div>
          <Outlet></Outlet>
         </div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden absolute top-0 left-0"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-[#e12453] text-base-content">
            {/* Sidebar content here */}
            <li className={liststyle}>
              <NavLink  to={"/"}><IoHomeSharp></IoHomeSharp></NavLink>
            </li>
            <li className={liststyle}>
              <NavLink to={"allUsers"}><FaUsers></FaUsers> users</NavLink>
            </li>
            <li className={liststyle}>
              <NavLink to={"addBanner"}><LuImagePlus></LuImagePlus>Add banner</NavLink>
            </li>
            <li className={liststyle}>
              <NavLink to={"allBanners"}><FaRegImages></FaRegImages>All banners</NavLink>
            </li>
            <li className={liststyle}>
              <NavLink to={"addTest"}><MdPostAdd></MdPostAdd>Add test</NavLink>
            </li>
            <li className={liststyle}>
              <NavLink to={"allTests"}><MdAddToPhotos></MdAddToPhotos>All tests</NavLink>
            </li>
            <li className={liststyle}>
              <NavLink to={"resurvation"}><FaListCheck></FaListCheck>Reservation</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashbord;
