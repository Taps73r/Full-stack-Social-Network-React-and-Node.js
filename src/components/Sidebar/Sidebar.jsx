import './Sidebar.css'
function Sidebar() {
  return (
    <div className="sidebar">
      <a href='/profile'>
      <div className="sidebaritem">
        Profile
      </div>
      </a>
      <a href='/dialogs'>
      <div className="sidebaritem">
        Messages
      </div>
      </a>
      <a href='/news'>
      <div className="sidebaritem">
        News
      </div>
      </a>
      <a href='/music'>
      <div className="sidebaritem">
        Music
      </div>
      </a>
      <a href='/settings'>
      <div className="sidebaritem">
        Settings
      </div>
      </a>
    </div>
  )
}

export default Sidebar;