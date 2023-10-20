import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
      <div className="sidebar">
        <NavLink to='/profile' id='f'>
          <div className='first-item'>
            <span className="material-symbols-outlined">
              person
            </span>
            Profile
          </div>
        </NavLink>
        <NavLink to='/dialogs'>
          <div className="sidebaritem">
            <span className="material-symbols-outlined">
              chat
            </span>
            Messages
          </div>
        </NavLink>
        <NavLink to='/news'>
          <div className="sidebaritem">
            <span className="material-symbols-outlined">
              newsmode
            </span>
            News
          </div>
        </NavLink>
        <NavLink to='/music'>
          <div className="sidebaritem">
            <span className="material-symbols-outlined">
              library_music
            </span>
            Music
          </div>
        </NavLink>
        <NavLink to='/settings' >
          <div className='last-item'>
            <span className="material-symbols-outlined">
              settings
            </span>
            Settings
          </div>
        </NavLink>
      </div>
  )
}

export default Sidebar;