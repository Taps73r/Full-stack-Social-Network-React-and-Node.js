import { NavLink } from 'react-router-dom';
import './Sidebar.css'
function Sidebar() {
  return (
    <div className='border'>
      <div className="sidebar">
        <NavLink to='/profile'>
          <div className="sidebaritem">
            <span class="material-symbols-outlined">
              person
            </span>
            Profile
          </div>
        </NavLink>
        <NavLink to='/dialogs'>
          <div className="sidebaritem">
            <span class="material-symbols-outlined">
              chat
            </span>
            Messages
          </div>
        </NavLink>
        <NavLink to='/news'>
          <div className="sidebaritem">
            <span class="material-symbols-outlined">
              newsmode
            </span>
            News
          </div>
        </NavLink>
        <NavLink to='/music'>
          <div className="sidebaritem">
            <span class="material-symbols-outlined">
              library_music
            </span>
            Music
          </div>
        </NavLink>
        <NavLink to='/settings'>
          <div className="sidebaritem">
            <span class="material-symbols-outlined">
              settings
            </span>
            Settings
          </div>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar;