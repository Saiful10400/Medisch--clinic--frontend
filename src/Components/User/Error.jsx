import { NavLink } from "react-router-dom";


const Error = () => {
    return (
       <div className="w-full h-screen flex lg:flex-row flex-col px-4 lg:px-0 justify-center items-center">
        <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="" />
         <div>
            
            <h1 className="text-5xl font-normal">Oops! Page Not Found</h1>
            <p className="text-2xl mb-5 my-2">The page you requested could not be found</p>
            <NavLink  to={"/"}><button className="btn btn-primary">Return home</button></NavLink>
        </div>
       </div>
    );
};

export default Error;