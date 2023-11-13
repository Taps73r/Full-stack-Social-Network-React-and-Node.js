import { NavLink } from "react-router-dom";
import './Login.css';

let PreLogin = () => {
    return (
        <div className="pre_login">
            <NavLink to={'/login'} id="login_route">
                Login
            </NavLink>

            <NavLink to={'/registration'} id="register_route">
                Registration
            </NavLink>
        </div>
    )
}

export default PreLogin;