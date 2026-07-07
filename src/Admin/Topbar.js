import React from "react";
import "../style/Admin/Topbar.css";
import logo from "../assets/CaliYog-Logo.png";

function Topbar({ isMobile, onToggleSidebar, onOpenSettings }) {
  return (
    <div className="admin-main-topbar">
      {/* Hamburger - Mobile only */}
      {isMobile && (
        <button className="hamburger-btn" onClick={onToggleSidebar} aria-label="Toggle Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      )}

      <div className="admin-topbar-brand">
        <img src={logo} alt="CaliYog Logo" />
        <div>
          <span>Admin Portal</span>
          <h2>CaliYog Dashboard</h2>
        </div>
      </div>

      {/* Search - Desktop only */}
      {!isMobile && (
        <div className="admin-topbar-search">
          <span>🔍</span>
          <input type="text" placeholder="Search dashboard..." />
        </div>
      )}

      {/* Settings - Desktop only */}
      {!isMobile && (
        <button className="admin-topbar-settings" onClick={onOpenSettings} aria-label="Settings">
          ⚙️ Settings
        </button>
      )}
    </div>
  );
}

export default Topbar;