import { NavLink } from 'react-router-dom';
import './Sidebar.css'
function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to='/profile'>
      <div className="sidebaritem">
        Profile
      </div>
      </NavLink>
      <NavLink to='/dialogs'>
      <div className="sidebaritem">
        Messages
      </div>
      </NavLink>
      <NavLink to='/news'>
      <div className="sidebaritem">
        News
      </div>
      </NavLink>
      <NavLink to='/music'>
      <div className="sidebaritem">
        Music
      </div>
      </NavLink>
      <NavLink to='/settings'>
      <div className="sidebaritem">
        Settings
      </div>
      </NavLink>
    </div>
  )
}

export default Sidebar;