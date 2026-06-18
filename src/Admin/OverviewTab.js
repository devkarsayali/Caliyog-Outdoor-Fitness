import React, { useEffect, useState } from "react";
import { db } from "../utils/db";
import {
  FiUsers,
  FiCalendar,
  FiActivity,
  FiCreditCard,
  FiUserCheck,
  FiArrowRight,
} from "react-icons/fi";

import "../style/Admin/AdminCommon.css";
import "../style/Admin/OverviewTab.css";

function OverviewTab({ setActiveTab }) {
  const [expertsCount, setExpertsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [programsCount, setProgramsCount] = useState(0);
  const [membershipsCount, setMembershipsCount] = useState(0);
  const [organisedEventsCount, setOrganisedEventsCount] = useState(0);

  const loadData = () => {
    setExpertsCount(db.getExperts().length);
    setEventsCount(db.getEvents().length);
    setMembershipsCount(db.getMemberships().length);
    setOrganisedEventsCount(db.getOrganisedEvents().length);
    setProgramsCount(5);
  };

  useEffect(() => {
    loadData();

    window.addEventListener("caliyog_db_update", loadData);

    return () => {
      window.removeEventListener("caliyog_db_update", loadData);
    };
  }, []);

  return (
    <div className="admin-content-window">

      <div className="overview-hero">
        <div>
          <span className="overview-label">CaliYog Admin</span>
          <h2>Welcome Back, Admin 👋</h2>
          <p>
            Monitor website content, manage experts, events,
            memberships and training sections from one place.
          </p>
        </div>

        <div className="overview-hero-box">
          <h3>{expertsCount + eventsCount + membershipsCount + organisedEventsCount}</h3>
          <span>Total Records</span>
        </div>
      </div>

      <section className="admin-stats-grid">

        <div className="stat-card-admin">
          <div className="stat-info-admin">
            <h3>Total Experts</h3>
            <div className="stat-number">{expertsCount}</div>
            <p>Professional trainers added</p>
          </div>

          <div className="stat-icon-admin">
            <FiUsers />
          </div>
        </div>

        <div className="stat-card-admin">
          <div className="stat-info-admin">
            <h3>Gallery Events</h3>
            <div className="stat-number">{eventsCount}</div>
            <p>Fitness gallery events</p>
          </div>

          <div className="stat-icon-admin">
            <FiCalendar />
          </div>
        </div>

        <div className="stat-card-admin">
          <div className="stat-info-admin">
            <h3>Training Programs</h3>
            <div className="stat-number">{programsCount}</div>
            <p>Website training batches</p>
          </div>

          <div className="stat-icon-admin">
            <FiActivity />
          </div>
        </div>

        <div className="stat-card-admin">
          <div className="stat-info-admin">
            <h3>Membership Plans</h3>
            <div className="stat-number">{membershipsCount}</div>
            <p>Active pricing plans</p>
          </div>

          <div className="stat-icon-admin">
            <FiCreditCard />
          </div>
        </div>

        <div className="stat-card-admin">
          <div className="stat-info-admin">
            <h3>Major Events</h3>
            <div className="stat-number">{organisedEventsCount}</div>
            <p>Organised club events</p>
          </div>

          <div className="stat-icon-admin">
            <FiUserCheck />
          </div>
        </div>

      </section>

      <div className="admin-summary-panel">

        <div className="admin-summary-header">
          <div>
            <h2>Dashboard Summary</h2>
            <p>Quickly manage all important CaliYog sections.</p>
          </div>
        </div>

        <div className="summary-grid">

          <div className="summary-row">
            <div>
              <h3>Experts</h3>
              <p>{expertsCount} Total Records</p>
            </div>

            <button
              onClick={() => setActiveTab && setActiveTab("experts")}
            >
              Manage <FiArrowRight />
            </button>
          </div>

          <div className="summary-row">
            <div>
              <h3>Events Gallery</h3>
              <p>{eventsCount} Total Records</p>
            </div>

            <button
              onClick={() => setActiveTab && setActiveTab("events")}
            >
              Manage <FiArrowRight />
            </button>
          </div>

          <div className="summary-row">
            <div>
              <h3>Membership Plans</h3>
              <p>{membershipsCount} Total Records</p>
            </div>

            <button
              onClick={() => setActiveTab && setActiveTab("membership")}
            >
              Manage <FiArrowRight />
            </button>
          </div>

          <div className="summary-row">
            <div>
              <h3>Major Organised Events</h3>
              <p>{organisedEventsCount} Total Records</p>
            </div>

            <button
              onClick={() => setActiveTab && setActiveTab("events")}
            >
              Manage <FiArrowRight />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default OverviewTab;