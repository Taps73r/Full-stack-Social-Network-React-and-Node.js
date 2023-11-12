import { NavLink } from 'react-router-dom';
import './Header.css';
function Header() {
    return (
        <div className='header'>
            <div className='header-name'>
                <NavLink to='/' id='h-d-name' >
                    converso
                </NavLink>
            </div>
        </div>
    )
}

export default Header;