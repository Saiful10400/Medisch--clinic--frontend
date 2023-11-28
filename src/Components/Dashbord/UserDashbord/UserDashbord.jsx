import { NavLink, Outlet } from "react-router-dom";

const UserDashbord = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><NavLink to={"myProfile"}>My profile</NavLink></li>
      <li><NavLink to={"upcomingAppoinment"}>Upcoming appoinment</NavLink></li>
      <li><NavLink to={"testResult"}>Test result</NavLink></li>
      
    </ul>
  
  </div>
</div>
    </div>
  );
};

export default UserDashbord;
