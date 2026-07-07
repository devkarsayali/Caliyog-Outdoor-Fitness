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
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSettings = () => {
    setActiveTab("settings");
    if (isMobile) setIsSidebarOpen(false);
  };

  const getContentClass = () => {
    if (isMobile) return "admin-content mobile-view";
    return isSidebarOpen ? "admin-content with-sidebar" : "admin-content full-width";
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* SIDEBAR - Fixed positioned */}
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onClose={closeSidebar}
        onToggle={toggleSidebar}
      />

      {/* MAIN AREA - This is the scrolling container */}
      <div className={`admin-main-area ${isMobile ? "mobile" : "desktop"}`}>
        {/* TOPBAR - Sticky inside the scrolling container */}
        <Topbar
          isMobile={isMobile}
          onToggleSidebar={toggleSidebar}
          onOpenSettings={openSettings}
        />

        {/* CONTENT - Scrolls under the sticky topbar */}
        <main className={getContentClass()}>
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