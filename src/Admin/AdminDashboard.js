import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import OverviewTab from "./OverviewTab";
import AboutTab from "./AboutTab";
import WhyChooseUsTab from "./WhyChooseUsTab";
import BatchesTab from "./BatchesTab";
import MembershipTab from "./MembershipTab";
import TransformationTab from "./TransformationsTab";
import ExpertsTab from "./ExpertsTab";
import EventsTab from "./EventsTab";
import EnquiriesTab from "./EnquiriesTab";
import ReportsTab from "./ReportsTab";
import MembersTab from "./MembersTab";
import SettingsTab from "./SettingsTab";

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
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      {!isSidebarOpen && (
        <button
          type="button"
          className="drawer-toggle-btn floating-open-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="admin-sidebar-title">
          <button
            type="button"
            className="drawer-toggle-btn sidebar-top-toggle"
            onClick={() => setIsSidebarOpen(false)}
          >
            ☰
          </button>

          <div className="logo-block">
            <img
              src={logo}
              alt="CaliYog Logo"
              className="admin-sidebar-logo"
            />

            <h2>CALIYOG</h2>
            <p>Fitness Admin Panel</p>
          </div>
        </div>

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

        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          <span>📊</span> Overview
        </button>

        <button
          className={activeTab === "about" ? "active" : ""}
          onClick={() => setActiveTab("about")}
        >
          <span>📝</span> About
        </button>

        <button
          className={activeTab === "whyChooseUs" ? "active" : ""}
          onClick={() => setActiveTab("whyChooseUs")}
        >
          <span>⭐</span> Why Choose Us
        </button>

        <button
          className={activeTab === "batches" ? "active" : ""}
          onClick={() => setActiveTab("batches")}
        >
          <span>🏋️</span> Batches
        </button>

        <button
          className={activeTab === "membership" ? "active" : ""}
          onClick={() => setActiveTab("membership")}
        >
          <span>💳</span> Membership
        </button>

        <button
          className={activeTab === "transformations" ? "active" : ""}
          onClick={() => setActiveTab("transformations")}
        >
          <span>🔥</span> Transformations
        </button>

        <button
          className={activeTab === "experts" ? "active" : ""}
          onClick={() => setActiveTab("experts")}
        >
          <span>👨‍🏫</span> Experts
        </button>

        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          <span>🎉</span> Events
        </button>

        <button
          className={activeTab === "enquiries" ? "active" : ""}
          onClick={() => setActiveTab("enquiries")}
        >
          <span>📩</span> Enquiries
        </button>

        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
        >
          <span>📋</span> Reports
        </button>

        <button
          className={activeTab === "members" ? "active" : ""}
          onClick={() => setActiveTab("members")}
        >
          <span>👥</span> Members
        </button>

        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          <span>⚙️</span> Settings
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          <span>🚪</span> Logout
        </button>
      </aside>

      <main
        className={`admin-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
        {activeTab === "overview" && (
          <OverviewTab setActiveTab={setActiveTab} />
        )}

        {activeTab === "about" && <AboutTab />}

        {activeTab === "whyChooseUs" && <WhyChooseUsTab />}

        {activeTab === "batches" && <BatchesTab />}

        {activeTab === "membership" && <MembershipTab />}

        {activeTab === "transformations" && <TransformationTab />}

        {activeTab === "experts" && <ExpertsTab />}

        {activeTab === "events" && <EventsTab />}

        {activeTab === "enquiries" && <EnquiriesTab />}

        {activeTab === "reports" && <ReportsTab />}

        {activeTab === "members" && <MembersTab />}

        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}

export default AdminDashboard;