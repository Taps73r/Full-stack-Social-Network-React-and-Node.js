import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <NavLink to="/profile" id="f-a">
          <div className="first-item">
            <span className="material-symbols-outlined">person</span>
            Profile
          </div>
        </NavLink>
        <NavLink to="/dialogs">
          <div className="sidebaritem">
            <span className="material-symbols-outlined">chat</span>
            Messages
          </div>
        </NavLink>
        <NavLink to="/users">
          <div className="sidebaritem">
            <span className="material-symbols-outlined">group_add</span>
            Users
          </div>
        </NavLink>
        <NavLink to="/news">
          <div className="sidebaritem">
            <span className="material-symbols-outlined">newsmode</span>
            News
          </div>
        </NavLink>
        <NavLink to="/settings" id="l-a">
          <div className="last-item">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </div>
        </NavLink>
      </div>

      <div className="sidebar-mobile">
        <NavLink to="/profile" id="f-a">
          <div className="first-item_mobile">
            <span className="material-symbols-outlined">person</span>
          </div>
        </NavLink>
        <NavLink to="/dialogs">
          <div className="sidebaritem_item">
            <span className="material-symbols-outlined">chat</span>
          </div>
        </NavLink>
        <NavLink to="/users">
          <div className="sidebaritem_item">
            <span className="material-symbols-outlined">group_add</span>
          </div>
        </NavLink>
        <NavLink to="/news">
          <div className="sidebaritem_item">
            <span className="material-symbols-outlined">newsmode</span>
          </div>
        </NavLink>
        <NavLink to="/settings" id="l-a">
          <div className="last-item_mobile">
            <span className="material-symbols-outlined">settings</span>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default Sidebar;
