import { NavLink } from "react-router-dom"

let SuccessComponent = () => {
    return(
        <div className="SuccessComponent">
            <p>Registration successful. Please proceed to the login page.</p>
            <NavLink id="login_style" to='/login'>
                Go to login page
            </NavLink>
        </div>
    )
}

export default SuccessComponent;