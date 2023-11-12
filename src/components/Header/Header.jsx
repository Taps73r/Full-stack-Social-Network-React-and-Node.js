import { NavLink } from 'react-router-dom';
import './Header.css';
function Header() {
    return (
        <div className='header'>
            <div className='header-name'>
                <NavLink to='/profile' id='h-d-name' >
                    converso
                </NavLink>
            </div>
            <div className='login-block'>
                <NavLink to={'/login'}>
                    Login
                </NavLink>
            </div>
        </div>
    )
}

export default Header;