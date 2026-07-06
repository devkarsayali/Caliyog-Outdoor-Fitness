import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OverviewTab from "./OverviewTab";
import AboutTab from "./AboutTab";
import WhyChooseUsTab from "./WhyChooseUsTab";
import BatchesTab from "./BatchesTab";
import MembershipTab from "./MembershipTab";
import TransformationTab from "./TransformationsTab";
import ExpertsTab from "./ExpertsTab";
import EnquiriesTab from "./EnquiriesTab";
import MembersTab from "./MembersTab";
import SettingsTab from "./SettingsTab";
import EventsManagerTab from "./EventsManagerTab";
import ReportsManagerTab from "./ReportsManagerTab";

import "../style/Admin/AdminDashboard.css";
import logo from "../assets/CaliYog-Logo.png";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      if (!mobile) setIsSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const adminData = JSON.parse(localStorage.getItem("adminData")) || {};

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminData");
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  // Handle tab change - close sidebar on mobile
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="admin-dashboard">
      {/* Mobile Overlay - Click to close sidebar */}
      {isMobile && isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}
      >
        <div className="admin-sidebar-title"></div>

        <div className="sidebar-menu">
          <button
            title="Dashboard"
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => handleTabChange("overview")}
          >
            <span>🏠</span>
            <b>Dashboard</b>
          </button>

          <button
            title="About"
            className={activeTab === "about" ? "active" : ""}
            onClick={() => handleTabChange("about")}
          >
            <span>📝</span>
            <b>About</b>
          </button>

          <button
            title="Why Choose Us"
            className={activeTab === "whyChooseUs" ? "active" : ""}
            onClick={() => handleTabChange("whyChooseUs")}
          >
            <span>⭐</span>
            <b>Why Choose Us</b>
          </button>

          <button
            title="Batches"
            className={activeTab === "batches" ? "active" : ""}
            onClick={() => handleTabChange("batches")}
          >
            <span>🏋️</span>
            <b>Batches</b>
          </button>

          <button
            title="Membership"
            className={activeTab === "membership" ? "active" : ""}
            onClick={() => handleTabChange("membership")}
          >
            <span>💳</span>
            <b>Membership</b>
          </button>

          <button
            title="Transformations"
            className={activeTab === "transformations" ? "active" : ""}
            onClick={() => handleTabChange("transformations")}
          >
            <span>🔥</span>
            <b>Transformations</b>
          </button>

          <button
            title="Experts"
            className={activeTab === "experts" ? "active" : ""}
            onClick={() => handleTabChange("experts")}
          >
            <span>👨‍🏫</span>
            <b>Experts</b>
          </button>

          <button
            title="Events"
            className={activeTab === "events" ? "active" : ""}
            onClick={() => handleTabChange("events")}
          >
            <span>🎉</span>
            <b>Events</b>
          </button>

          <button
            title="Enquiries"
            className={activeTab === "enquiries" ? "active" : ""}
            onClick={() => handleTabChange("enquiries")}
          >
            <span>📩</span>
            <b>Enquiries</b>
          </button>

          <button
            title="Reports"
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => handleTabChange("reports")}
          >
            <span>📋</span>
            <b>Reports</b>
          </button>

          <button
            title="Members"
            className={activeTab === "members" ? "active" : ""}
            onClick={() => handleTabChange("members")}
          >
            <span>👥</span>
            <b>Members</b>
          </button>
        </div>

        <div className="sidebar-bottom-box">
          <div className="admin-profile-card">
            <div className="admin-profile-avatar">
              {adminData?.name ? adminData.name.charAt(0).toUpperCase() : "A"}
            </div>

            <div className="admin-profile-info">
              <h4>{adminData?.name || "Admin"}</h4>
              <p>{adminData?.email || "admin@caliyog.com"}</p>
              <span>● Active</span>
            </div>
          </div>

          <button title="Logout" className="logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            <b>Logout</b>
          </button>
        </div>
      </aside>

      <main
        className={`admin-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
        <div className="admin-main-topbar">
          {/* Hamburger button - only shows on mobile */}
          <button
            className="hamburger-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

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
            onClick={() => handleTabChange("settings")}
          >
            ⚙️ Settings
          </button>
        </div>

        {activeTab === "overview" && <OverviewTab setActiveTab={handleTabChange} />}
        {activeTab === "about" && <AboutTab />}
        {activeTab === "whyChooseUs" && <WhyChooseUsTab />}
        {activeTab === "batches" && <BatchesTab />}
        {activeTab === "membership" && <MembershipTab />}
        {activeTab === "transformations" && <TransformationTab />}
        {activeTab === "experts" && <ExpertsTab />}
        {activeTab === "events" && <EventsManagerTab />}
        {activeTab === "enquiries" && <EnquiriesTab />}
        {activeTab === "reports" && <ReportsManagerTab />}
        {activeTab === "members" && <MembersTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}

export default AdminDashboard;