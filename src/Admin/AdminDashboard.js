import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import OverviewTab from "./OverviewTab";
import AboutTab from "./AboutTab";
import WhyChooseUsTab from "./WhyChooseUsTab";
import BatchesTab from "./BatchesTab";
import MembershipTab from "./MembershipTab";
import TransformationTab from "./TransformationsTab";
import ExpertsTab from "./ExpertsTab";
//import EventsTab from "./EventsTab";
//import GalleryEventsTab from "./GalleryEventsTab";
import EnquiriesTab from "./EnquiriesTab";
//import ReportsTab from "./ReportsTab";
//import KidsReportsTab from "./KidsReportsTab";
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

  const adminData = JSON.parse(localStorage.getItem("adminData")) || {};

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminData");
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button
          type="button"
          className="drawer-toggle-btn sidebar-top-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "‹" : "›"}
        </button>

        <div className="admin-sidebar-title">
         
        </div>

        <div className="sidebar-menu">
          <button
            title="Dashboard"
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            <span>🏠</span>
            <b>Dashboard</b>
          </button>

          <button
            title="About"
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            <span>📝</span>
            <b>About</b>
          </button>

          <button
            title="Why Choose Us"
            className={activeTab === "whyChooseUs" ? "active" : ""}
            onClick={() => setActiveTab("whyChooseUs")}
          >
            <span>⭐</span>
            <b>Why Choose Us</b>
          </button>

          <button
            title="Batches"
            className={activeTab === "batches" ? "active" : ""}
            onClick={() => setActiveTab("batches")}
          >
            <span>🏋️</span>
            <b>Batches</b>
          </button>

          <button
            title="Membership"
            className={activeTab === "membership" ? "active" : ""}
            onClick={() => setActiveTab("membership")}
          >
            <span>💳</span>
            <b>Membership</b>
          </button>

          <button
            title="Transformations"
            className={activeTab === "transformations" ? "active" : ""}
            onClick={() => setActiveTab("transformations")}
          >
            <span>🔥</span>
            <b>Transformations</b>
          </button>

          <button
            title="Experts"
            className={activeTab === "experts" ? "active" : ""}
            onClick={() => setActiveTab("experts")}
          >
            <span>👨‍🏫</span>
            <b>Experts</b>
          </button>

          <button
  title="Events"
  className={activeTab === "events" ? "active" : ""}
  onClick={() => setActiveTab("events")}
>
  <span>🎉</span>
  <b>Events</b>
</button>

          <button
            title="Enquiries"
            className={activeTab === "enquiries" ? "active" : ""}
            onClick={() => setActiveTab("enquiries")}
          >
            <span>📩</span>
            <b>Enquiries</b>
          </button>

          <button
  title="Reports"
  className={activeTab === "reports" ? "active" : ""}
  onClick={() => setActiveTab("reports")}
>
  <span>📋</span>
  <b>Reports</b>
</button>
          <button
            title="Members"
            className={activeTab === "members" ? "active" : ""}
            onClick={() => setActiveTab("members")}
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
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
          </button>
        </div>

        {activeTab === "overview" && <OverviewTab setActiveTab={setActiveTab} />}
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