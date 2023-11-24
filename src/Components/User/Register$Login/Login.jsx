import { NavLink } from "react-router-dom";

 
const Login = () => {
    return (
        <div>
            login <NavLink to={"/register"}>register</NavLink>
        </div>
    );
};

export default Login;