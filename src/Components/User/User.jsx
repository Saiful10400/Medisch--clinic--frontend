import { Outlet } from "react-router-dom";
import Navbar from "./Home/Navbar";
import Footer from "./Footer";

const User = () => {
  return (
    <div>
      <div className="sticky z-10 top-0">
        <Navbar></Navbar>
      </div>

      <div className="relative z-0">
        {" "}
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default User;
