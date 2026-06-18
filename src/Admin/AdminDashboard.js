import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import OverviewTab from "./OverviewTab";
import ExpertsTab from "./ExpertsTab";
import EventsTab from "./EventsTab";
import MembershipTab from "./MembershipTab";
import ReportsTab from "./ReportsTab";
import EnquiriesTab from "./EnquiriesTab";
import MembersTab from "./MembersTab";

import "../style/Admin/AdminDashboard.css";
import logo from "../assets/CaliYog-Logo.png";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-title">
          <img
            src={logo}
            alt="CaliYog Logo"
            className="admin-sidebar-logo"
          />

          <h2>CALIYOG</h2>
          <p>Fitness Admin Panel</p>
        </div>

        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          <span>📊</span> Overview
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
          className={activeTab === "membership" ? "active" : ""}
          onClick={() => setActiveTab("membership")}
        >
          <span>💳</span> Membership
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
          className={activeTab === "enquiries" ? "active" : ""}
          onClick={() => setActiveTab("enquiries")}
        >
          <span>📩</span> Enquiries
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      <main className="admin-content">
        <div className="admin-topbar">
          <div>
            <h1>
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "experts" && "Manage Experts"}
              {activeTab === "events" && "Manage Events"}
              {activeTab === "membership" && "Manage Membership"}
              {activeTab === "reports" && "User Reports"}
              {activeTab === "members" && "Members Management"}
              {activeTab === "enquiries" && "User Enquiries"}
            </h1>

            <p>
              Welcome Admin, manage your CaliYog fitness club easily.
            </p>
          </div>

          <div className="admin-badge">
            Admin
          </div>
        </div>

        {activeTab === "overview" && (
          <OverviewTab setActiveTab={setActiveTab} />
        )}

        {activeTab === "experts" && <ExpertsTab />}

        {activeTab === "events" && <EventsTab />}

        {activeTab === "membership" && <MembershipTab />}

        {activeTab === "reports" && <ReportsTab />}

        {activeTab === "members" && <MembersTab />}

        {activeTab === "enquiries" && <EnquiriesTab />}
      </main>
    </div>
  );
}

export default AdminDashboard;