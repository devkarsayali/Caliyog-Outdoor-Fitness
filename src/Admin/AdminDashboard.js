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

  // =========================================
  // HANDLE RESIZE
  // =========================================
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // =========================================
  // LOAD GLOBAL SEARCH DATA
  // =========================================
  useEffect(() => {
    const getArray = (data) => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.data)) return data.data;
      if (Array.isArray(data.events)) return data.events;
      if (Array.isArray(data.experts)) return data.experts;
      if (Array.isArray(data.memberships)) return data.memberships;
      if (Array.isArray(data.enquiries)) return data.enquiries;
      if (Array.isArray(data.members)) return data.members;
      if (Array.isArray(data.batchMembers)) return data.batchMembers;
      if (Array.isArray(data.transformations)) return data.transformations;
      if (Array.isArray(data.batches)) return data.batches;
      if (Array.isArray(data.galleryEvents)) return data.galleryEvents;
      if (Array.isArray(data.galleryevents)) return data.galleryevents;
      if (Array.isArray(data.organisedEvents)) return data.organisedEvents;
      if (Array.isArray(data.organisedevents)) return data.organisedevents;
      return [];
    };

    const getSearchableText = (record) => {
      const fields = [
        record.name,
        record.title,
        record.email,
        record.contact,
        record.mobile,
        record.phone,
        record.address,
        record.batch,
        record.timing,
        record.timingType,
        record.membership,
        record.transactionType,
        record.specialization,
        record.experience,
        record.role,
        record.designation,
        record.bio,
        record.description,
        record.parentName,
        record.parentEmail,
        record.parentContact,
        record.status,
        record.type,
      ];
      return fields.filter(Boolean).join(" ").toLowerCase();
    };

    const getDisplayTitle = (record) => {
      return (
        record.name ||
        record.title ||
        record.email ||
        record.contact ||
        record.mobile ||
        record.phone ||
        record.membership ||
        record.parentName ||
        "Untitled Record"
      );
    };

    const getDisplaySubtitle = (record) => {
      return (
        record.email ||
        record.specialization ||
        record.batch ||
        record.membership ||
        record.timing ||
        record.contact ||
        record.mobile ||
        record.phone ||
        record.parentEmail ||
        ""
      );
    };

    const loadSearchData = async () => {
      try {
        const token =
          localStorage.getItem("adminToken") || localStorage.getItem("token");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const urls = [
          { type: "Experts", tab: "experts", icon: "👨‍🏫", url: `${API_URL}/api/experts` },
          { type: "Gallery Events", tab: "events", icon: "🎉", url: `${API_URL}/api/events/gallery` },
          { type: "Events", tab: "events", icon: "📅", url: `${API_URL}/api/events` },
          { type: "Membership", tab: "membership", icon: "💳", url: `${API_URL}/api/memberships` },
          { type: "Join Requests", tab: "reports", icon: "📋", url: `${API_URL}/api/join` },
          { type: "Members", tab: "members", icon: "👥", url: `${API_URL}/api/members` },
          { type: "Batch Members", tab: "members", icon: "🏋️", url: `${API_URL}/api/batch-members` },
          { type: "Enquiries", tab: "enquiries", icon: "📩", url: `${API_URL}/api/contacts` },
          { type: "Batches", tab: "batches", icon: "📚", url: `${API_URL}/api/batches` },
          { type: "Transformations", tab: "transformations", icon: "🔥", url: `${API_URL}/api/transformations` },
        ];

        // ✅ Step 1: Fetch all responses first
        const responses = await Promise.allSettled(
          urls.map((item) => fetch(item.url, { headers }).catch(() => null))
        );

        // ✅ Step 2: Parse all responses into a normalized shape (no loop closures)
        const parsedPayloads = responses.map((res, i) => {
          const urlInfo = urls[i];
          if (res.status === "fulfilled" && res.value && res.value.ok) {
            return res.value.json().then((data) => ({
              ok: true,
              urlInfo,
              records: getArray(data),
            })).catch(() => ({ ok: false, urlInfo, records: [] }));
          }
          return { ok: false, urlInfo, records: [] };
        });

        const allPayloads = await Promise.all(parsedPayloads);

        // ✅ Step 3: Collect member emails FIRST (no loop functions)
        const memberEmails = new Set();
        allPayloads.forEach((payload) => {
          if (!payload.ok) return;
          if (
            payload.urlInfo.type === "Members" ||
            payload.urlInfo.type === "Batch Members"
          ) {
            payload.records.forEach((r) => {
              if (r.email) {
                memberEmails.add(r.email.toLowerCase().trim());
              }
            });
          }
        });

        // ✅ Step 4: Build final data with filter logic inline (no external filter closure)
        const finalData = [];
        allPayloads.forEach((payload) => {
          if (!payload.ok) return;
          const { urlInfo, records } = payload;

          records.forEach((record) => {
            // Skip Join Requests that have a matching member email
            if (urlInfo.type === "Join Requests") {
              const email = (record.email || "").toLowerCase().trim();
              if (memberEmails.has(email)) return;
            }

            finalData.push({
              ...record,
              type: urlInfo.type,
              tab: urlInfo.tab,
              icon: urlInfo.icon,
              _searchText: getSearchableText(record),
              _displayTitle: getDisplayTitle(record),
              _displaySubtitle: getDisplaySubtitle(record),
              _priority:
                urlInfo.type === "Members" || urlInfo.type === "Batch Members"
                  ? 1
                  : 2,
            });
          });
        });

        console.log("✅ Global Search Data Loaded:", finalData.length, "records");
        console.log("📊 Member emails collected:", memberEmails.size);
        setAllSearchData(finalData);
      } catch (error) {
        console.error("Global Search Load Error:", error);
      }
    };

    loadSearchData();
  }, []);

  // =========================================
  // FILTER SEARCH RESULTS
  // =========================================
  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchText.toLowerCase().trim();
    const queryWords = query.split(/\s+/).filter(Boolean);

    const filtered = allSearchData.filter((item) => {
      const itemSearchText = item._searchText || "";

      if (itemSearchText.includes(query)) return true;

      if (queryWords.length > 1) {
        return queryWords.some((word) => itemSearchText.includes(word));
      }

      if (query.length >= 3) {
        let searchIndex = 0;
        for (let i = 0; i < itemSearchText.length && searchIndex < query.length; i++) {
          if (itemSearchText[i] === query[searchIndex]) {
            searchIndex++;
          }
        }
        if (searchIndex >= query.length * 0.8) return true;
      }

      return false;
    });

    const sorted = filtered.sort((a, b) => {
      if (a._priority !== b._priority) {
        return (a._priority || 99) - (b._priority || 99);
      }

      const aTitle = (a._displayTitle || "").toLowerCase();
      const bTitle = (b._displayTitle || "").toLowerCase();

      if (aTitle === query) return -1;
      if (bTitle === query) return 1;
      if (aTitle.startsWith(query) && !bTitle.startsWith(query)) return -1;
      if (!aTitle.startsWith(query) && bTitle.startsWith(query)) return 1;
      if (aTitle.includes(query) && !bTitle.includes(query)) return -1;
      if (!aTitle.includes(query) && bTitle.includes(query)) return 1;

      return 0;
    });

    setSearchResults(sorted.slice(0, 15));
  }, [searchText, allSearchData]);

  // =========================================
  // HANDLERS
  // =========================================
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

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