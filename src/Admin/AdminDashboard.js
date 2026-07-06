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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

 

  const openSettings = () => {
    setActiveTab("settings");
  };

  return (
    <div className="admin-dashboard">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* TOPBAR */}
      <Topbar
        isMobile={isMobile}
        onToggleSidebar={toggleSidebar}
        onOpenSettings={openSettings}
      />

      {/* SIDEBAR with toggle button */}
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onClose={closeSidebar}
        onToggle={toggleSidebar}          // ← NEW PROP
      />

      {/* CONTENT */}
      <main
        className={`admin-content ${
          isSidebarOpen ? "with-sidebar" : "full-width"
        }`}
      >
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