import React, { useState, useEffect } from "react";
import "../style/Admin/AdminDashboard.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

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

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSettings = () => {
    setActiveTab("settings");
    if (isMobile) setIsSidebarOpen(false);
  };

  const getMainAreaClass = () => {
    if (isMobile) return "admin-main-area mobile";
    return isSidebarOpen
      ? "admin-main-area desktop sidebar-open"
      : "admin-main-area desktop sidebar-closed";
  };

  return (
    <div className="admin-dashboard-wrapper">
      <Topbar
        isMobile={isMobile}
        onToggleSidebar={toggleSidebar}
        onOpenSettings={openSettings}
      />

      {isMobile && isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onClose={closeSidebar}
        onToggle={toggleSidebar}
      />

      <div className={getMainAreaClass()}>
        <main className="admin-content">
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
    </div>
  );
}

export default AdminDashboard;