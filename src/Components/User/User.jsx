
import { Outlet } from 'react-router-dom';
import Navbar from './Home/Navbar';

const User = () => {
    return (
        <div>
            <Navbar></Navbar>

           <div> <Outlet></Outlet></div>
        </div>
    );
};

export default User;