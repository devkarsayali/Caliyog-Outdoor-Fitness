import React from "react";
import "../style/Admin/Topbar.css";
import logo from "../assets/CaliYog-Logo.png";

function Topbar({ isMobile, onToggleSidebar, onOpenSettings }) {
  return (
    <div className="admin-main-topbar">
      {/* Hamburger button - only shows on mobile */}
      {isMobile && (
        <button
          className="hamburger-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      )}

      <div className="admin-topbar-brand">
        <img src={logo} alt="CaliYog Logo" />
        <div>
          <span>Admin Portal</span>
          <h2>CaliYog Dashboard</h2>
        </div>
      </div>

      <div className="admin-topbar-search">
        <span>🔍</span>
        <input type="text" placeholder="Search dashboard..." />
      </div>

      <button
        className="admin-topbar-settings"
        onClick={onOpenSettings}
        aria-label="Settings"
      >
        ⚙️ Settings
      </button>
    </div>
  );
}

export default Topbar;