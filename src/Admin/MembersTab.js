import React, { useEffect, useState } from "react";
import { db } from "../utils/db";
import "../style/Admin/MembersTab.css";

function MembersTab() {
  const [members, setMembers] = useState([]);
  const [batchMembers, setBatchMembers] = useState([]);

  const loadData = () => {
    setMembers(db.getMembers());
    setBatchMembers(db.getBatchMembers());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("caliyog_db_update", loadData);

    return () => {
      window.removeEventListener("caliyog_db_update", loadData);
    };
  }, []);

  const getMembershipDays = (membership) => {
    if (membership.includes("Weekly")) return 7;
    if (membership.includes("15 Days")) return 15;
    if (membership.includes("Monthly")) return 30;
    if (membership.includes("3 Months")) return 90;
    if (membership.includes("6 Months")) return 180;
    if (membership.includes("Yearly")) return 365;
    return 30;
  };

  const getRemainingDays = (member) => {
    const start = new Date(member.startDate);
    const totalDays = getMembershipDays(member.membership);

    const end = new Date(start);
    end.setDate(start.getDate() + totalDays);

    const today = new Date();
    const diff = end - today;

    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  return (
    <div>
      <div className="members-header">
        <h1>Members Management</h1>
        <p>View active members and batch-wise students</p>
      </div>

      <div className="members-box">
        <h2>All Members</h2>

        <div className="members-grid">
          {members.length === 0 ? (
            <div className="empty-members">
              No members added yet.
            </div>
          ) : (
            members.map((member) => (
              <div className="member-card" key={member.id}>
                <h3>{member.name}</h3>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Mobile:</strong> {member.mobile}</p>
                <p><strong>Membership:</strong> {member.membership}</p>
                <p><strong>Payment:</strong> {member.transactionType}</p>

                <span className="remaining-badge">
                  {getRemainingDays(member)} days remaining
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="members-box">
        <h2>Batch Members</h2>

        <div className="batch-member-grid">
          {batchMembers.length === 0 ? (
            <div className="empty-members">
              No batch members added yet.
            </div>
          ) : (
            batchMembers.map((member) => (
              <div className="batch-member-card" key={member.id}>
                <h3>{member.name}</h3>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Mobile:</strong> {member.mobile}</p>
                <p><strong>Batch:</strong> {member.batch}</p>
                <p><strong>Timing:</strong> {member.timingType} - {member.timing}</p>

                {member.parentName && (
                  <>
                    <p><strong>Parent:</strong> {member.parentName}</p>
                    <p><strong>Parent Contact:</strong> {member.parentContact}</p>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MembersTab;