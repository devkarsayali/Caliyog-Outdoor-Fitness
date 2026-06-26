import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiCalendar,
  FiActivity,
  FiCreditCard,
  FiUserCheck,
  FiArrowRight,
  FiMail,
  FiClipboard,
  FiUserPlus,
} from "react-icons/fi";

import "../style/Admin/AdminCommon.css";
import "../style/Admin/OverviewTab.css";

function OverviewTab({ setActiveTab }) {
  const API_URL = "http://192.168.11.11:5000";

  const [expertsCount, setExpertsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [programsCount, setProgramsCount] = useState(0);
  const [membershipsCount, setMembershipsCount] = useState(0);
  const [organisedEventsCount, setOrganisedEventsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [batchMembersCount, setBatchMembersCount] = useState(0);
  const [enquiriesCount, setEnquiriesCount] = useState(0);

  useEffect(() => {
    const getArrayLength = (data) => {
      if (Array.isArray(data)) return data.length;
      if (Array.isArray(data.data)) return data.data.length;
      if (Array.isArray(data.events)) return data.events.length;
      if (Array.isArray(data.experts)) return data.experts.length;
      if (Array.isArray(data.memberships)) return data.memberships.length;
      if (Array.isArray(data.enquiries)) return data.enquiries.length;
      if (Array.isArray(data.members)) return data.members.length;
      return 0;
    };

    const loadData = async () => {
      try {
        const [
          expertsRes,
          eventsRes,
          membershipsRes,
          joinRes,
          membersRes,
          batchMembersRes,
          enquiriesRes,
        ] = await Promise.allSettled([
          fetch(`${API_URL}/api/experts`),
          fetch(`${API_URL}/api/events`),
          fetch(`${API_URL}/api/memberships`),
          fetch(`${API_URL}/api/join`),
          fetch(`${API_URL}/api/members`),
          fetch(`${API_URL}/api/batch-members`),
          fetch(`${API_URL}/api/contacts`),
        ]);

        if (expertsRes.status === "fulfilled" && expertsRes.value.ok) {
          const data = await expertsRes.value.json();
          setExpertsCount(getArrayLength(data));
        }

        if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
          const data = await eventsRes.value.json();
          setEventsCount(getArrayLength(data));
        }

        if (membershipsRes.status === "fulfilled" && membershipsRes.value.ok) {
          const data = await membershipsRes.value.json();
          setMembershipsCount(getArrayLength(data));
        }

        if (joinRes.status === "fulfilled" && joinRes.value.ok) {
          const data = await joinRes.value.json();
          setReportsCount(getArrayLength(data));
        }

        if (membersRes.status === "fulfilled" && membersRes.value.ok) {
          const data = await membersRes.value.json();
          setMembersCount(getArrayLength(data));
        }

        if (
          batchMembersRes.status === "fulfilled" &&
          batchMembersRes.value.ok
        ) {
          const data = await batchMembersRes.value.json();
          setBatchMembersCount(getArrayLength(data));
        }

        if (enquiriesRes.status === "fulfilled" && enquiriesRes.value.ok) {
          const data = await enquiriesRes.value.json();
          setEnquiriesCount(getArrayLength(data));
        }

        setProgramsCount(5);
        setOrganisedEventsCount(5);
      } catch (error) {
        console.error("Overview Load Error:", error);
      }
    };

    loadData();
  }, []);

  const totalRecords =
    expertsCount +
    eventsCount +
    programsCount +
    membershipsCount +
    organisedEventsCount +
    reportsCount +
    membersCount +
    batchMembersCount +
    enquiriesCount;

  return (
    <div className="admin-content-window">
      <div className="overview-hero">
        <div>
          <span className="overview-label">CaliYog Admin</span>
          <h2>Welcome Back, Admin 👋</h2>
          <p>
            Monitor website content, user requests, members, batch members,
            enquiries, events, experts and membership plans from one place.
          </p>
        </div>

        <div className="overview-hero-box">
          <h3>{totalRecords}</h3>
          <span>Total Records</span>
        </div>
      </div>

      <section className="admin-stats-grid">
        <StatCard title="Total Experts" number={expertsCount} text="Professional trainers added" icon={<FiUsers />} />
        <StatCard title="Gallery Events" number={eventsCount} text="Fitness gallery events" icon={<FiCalendar />} />
        <StatCard title="Training Programs" number={programsCount} text="Website training batches" icon={<FiActivity />} />
        <StatCard title="Membership Plans" number={membershipsCount} text="Active pricing plans" icon={<FiCreditCard />} />
        <StatCard title="Major Events" number={organisedEventsCount} text="Organised club events" icon={<FiUserCheck />} />
        <StatCard title="User Reports" number={reportsCount} text="Membership and batch requests" icon={<FiClipboard />} />
        <StatCard title="Active Members" number={membersCount} text="Users added as members" icon={<FiUserPlus />} />
        <StatCard title="Batch Members" number={batchMembersCount} text="Users added to batches" icon={<FiUsers />} />
        <StatCard title="Enquiries" number={enquiriesCount} text="Contact form messages" icon={<FiMail />} />
      </section>

      <div className="admin-summary-panel">
        <div className="admin-summary-header">
          <div>
            <h2>Dashboard Summary</h2>
            <p>Quickly manage all important CaliYog admin sections.</p>
          </div>
        </div>

        <div className="summary-grid">
          <SummaryRow title="Experts" count={`${expertsCount} Total Records`} tab="experts" setActiveTab={setActiveTab} />
          <SummaryRow title="Events Gallery" count={`${eventsCount} Total Records`} tab="events" setActiveTab={setActiveTab} />
          <SummaryRow title="Membership Plans" count={`${membershipsCount} Total Records`} tab="membership" setActiveTab={setActiveTab} />
          <SummaryRow title="User Reports" count={`${reportsCount} Total Requests`} tab="reports" setActiveTab={setActiveTab} />
          <SummaryRow title="Members" count={`${membersCount} Active Members`} tab="members" setActiveTab={setActiveTab} />
          <SummaryRow title="Batch Members" count={`${batchMembersCount} Batch Students`} tab="members" setActiveTab={setActiveTab} />
          <SummaryRow title="Enquiries" count={`${enquiriesCount} Contact Messages`} tab="enquiries" setActiveTab={setActiveTab} />
          <SummaryRow title="Major Organised Events" count={`${organisedEventsCount} Total Records`} tab="events" setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, number, text, icon }) {
  return (
    <div className="stat-card-admin">
      <div className="stat-info-admin">
        <h3>{title}</h3>
        <div className="stat-number">{number}</div>
        <p>{text}</p>
      </div>

      <div className="stat-icon-admin">{icon}</div>
    </div>
  );
}

function SummaryRow({ title, count, tab, setActiveTab }) {
  return (
    <div className="summary-row">
      <div>
        <h3>{title}</h3>
        <p>{count}</p>
      </div>

      <button onClick={() => setActiveTab && setActiveTab(tab)}>
        Manage <FiArrowRight />
      </button>
    </div>
  );
}

export default OverviewTab;