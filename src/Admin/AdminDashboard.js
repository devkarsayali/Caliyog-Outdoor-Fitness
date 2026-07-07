import React, { useState, useEffect } from "react";
import "../style/Admin/AdminDashboard.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import GlobalSearchResults from "./GlobalSearchResults";

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
  const API_URL =
    "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allSearchData, setAllSearchData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getArray = (data) => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.data)) return data.data;
      if (Array.isArray(data.events)) return data.events;
      if (Array.isArray(data.experts)) return data.experts;
      if (Array.isArray(data.memberships)) return data.memberships;
      if (Array.isArray(data.enquiries)) return data.enquiries;
      if (Array.isArray(data.members)) return data.members;
      return [];
    };

    const loadSearchData = async () => {
      try {
        const urls = [
          {
            type: "Experts",
            tab: "experts",
            icon: "👨‍🏫",
            url: `${API_URL}/api/experts`,
          },
          {
            type: "Events",
            tab: "events",
            icon: "🎉",
            url: `${API_URL}/api/events`,
          },
          {
            type: "Membership",
            tab: "membership",
            icon: "💳",
            url: `${API_URL}/api/memberships`,
          },
          {
            type: "Reports",
            tab: "reports",
            icon: "📋",
            url: `${API_URL}/api/join`,
          },
          {
            type: "Members",
            tab: "members",
            icon: "👥",
            url: `${API_URL}/api/members`,
          },
          {
            type: "Batch Members",
            tab: "members",
            icon: "🏋️",
            url: `${API_URL}/api/batch-members`,
          },
          {
            type: "Enquiries",
            tab: "enquiries",
            icon: "📩",
            url: `${API_URL}/api/contacts`,
          },
        ];

        const responses = await Promise.allSettled(
          urls.map((item) => fetch(item.url))
        );

        let finalData = [];

        for (let i = 0; i < responses.length; i++) {
          const res = responses[i];

          if (res.status === "fulfilled" && res.value.ok) {
            const data = await res.value.json();
            const records = getArray(data);

            const formatted = records.map((record) => ({
              ...record,
              type: urls[i].type,
              tab: urls[i].tab,
              icon: urls[i].icon,
              title:
                record.name ||
                record.title ||
                record.email ||
                record.contact ||
                record.phone ||
                record.membership ||
                "Untitled Record",
            }));

            finalData = [...finalData, ...formatted];
          }
        }

        console.log("Global Search Data:", finalData);
        setAllSearchData(finalData);
      } catch (error) {
        console.error("Global Search Load Error:", error);
      }
    };

    loadSearchData();
  }, []);

  useEffect(() => {
  if (!searchText.trim()) {
    setSearchResults([]);
    return;
  }

  const query = searchText.toLowerCase();

  const filtered = allSearchData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(query)
  );

  console.log("Search Text:", query);
  console.log("All Data:", allSearchData);
  console.log("Filtered:", filtered);

  setSearchResults(filtered);
}, [searchText, allSearchData]);

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

  const handleSearchResultClick = (item) => {
    setActiveTab(item.tab);
    setSearchText("");
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
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <GlobalSearchResults
        searchText={searchText}
        results={searchResults}
        onResultClick={handleSearchResultClick}
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
          {activeTab === "overview" && (
            <OverviewTab setActiveTab={handleTabChange} />
          )}
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