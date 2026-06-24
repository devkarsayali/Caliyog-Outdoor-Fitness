import React, { useEffect, useState } from "react";
import "../style/Admin/MembersTab.css";

const API_URL = "http://192.168.11.5:5000";

function MembersTab() {
  const [members, setMembers] = useState([]);
  const [kidsMembers, setKidsMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("adminToken") || localStorage.getItem("token");
  };

  const getArrayData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.members)) return data.members;
    if (Array.isArray(data.batchMembers)) return data.batchMembers;
    return [];
  };

  const isKidsMember = (member) => {
    const batch = String(member.batch || "").toLowerCase();
    const membership = String(member.membership || "").toLowerCase();
    const title = String(member.title || "").toLowerCase();

    return (
      batch.includes("kid") ||
      membership.includes("kid") ||
      title.includes("kid")
    );
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const token = getToken();

      const [memberResponse, kidsResponse] = await Promise.all([
        fetch(`${API_URL}/api/members`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }),
        fetch(`${API_URL}/api/batch-members`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }),
      ]);

      const memberData = await memberResponse.json();
      const kidsData = await kidsResponse.json();

      const allMembers = memberResponse.ok ? getArrayData(memberData) : [];
      const batchKids = kidsResponse.ok ? getArrayData(kidsData) : [];

      const normalMembers = allMembers.filter((member) => !isKidsMember(member));
      const kidsFromMembers = allMembers.filter((member) => isKidsMember(member));

      setMembers(normalMembers);
      setKidsMembers([...kidsFromMembers, ...batchKids]);
    } catch (error) {
      console.error("Members Load Error:", error);
      alert("Failed to load members from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const refreshMembers = () => {
      loadData();
    };

    window.addEventListener("membersUpdated", refreshMembers);

    return () => {
      window.removeEventListener("membersUpdated", refreshMembers);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMembershipDays = (membership = "") => {
    if (membership.includes("Weekly")) return 7;
    if (membership.includes("15 Days")) return 15;
    if (membership.includes("Monthly")) return 30;
    if (membership.includes("3 Months")) return 90;
    if (membership.includes("6 Months")) return 180;
    if (membership.includes("Yearly")) return 365;
    return 30;
  };

  const getRemainingDays = (member) => {
    const start = new Date(member.startDate || member.createdAt);
    const totalDays = getMembershipDays(member.membership || "");

    if (isNaN(start.getTime())) return 0;

    const end = new Date(start);
    end.setDate(start.getDate() + totalDays);

    const diff = end - new Date();

    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString();
  };

  const deleteMember = async (id, type) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {
      const token = getToken();

      const url =
        type === "kids"
          ? `${API_URL}/api/batch-members/${id}`
          : `${API_URL}/api/members/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Member deleted successfully");
        loadData();
      } else {
        alert(data.message || "Failed to delete member");
      }
    } catch (error) {
      console.error("Delete Member Error:", error);
      alert("Backend connection failed");
    }
  };

  const renderMembersTable = () => {
    return (
      <div className="members-table-wrapper">
        <table className="members-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Batch</th>
              <th>Timing Type</th>
              <th>Timing</th>
              <th>Membership</th>
              <th>Payment</th>
              <th>Start Date</th>
              <th>Remaining</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="12" className="empty-members">
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member._id || member.id}>
                  <td>
                    <strong>{member.name || "-"}</strong>
                  </td>
                  <td>{member.email || "-"}</td>
                  <td>{member.contact || member.mobile || "-"}</td>
                  <td>{member.address || "-"}</td>
                  <td>{member.batch || "-"}</td>
                  <td>{member.timingType || "-"}</td>
                  <td>{member.timing || "-"}</td>
                  <td>{member.membership || "-"}</td>
                  <td>{member.transactionType || "-"}</td>
                  <td>{formatDate(member.startDate || member.createdAt)}</td>
                  <td>
                    <span className="remaining-badge">
                      {getRemainingDays(member)} days
                    </span>
                  </td>
                  <td>
                    <button
                      className="member-delete-btn"
                      onClick={() =>
                        deleteMember(member._id || member.id, "member")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderKidsTable = () => {
    return (
      <div className="members-table-wrapper">
        <table className="members-table">
          <thead>
            <tr>
              <th>Kid Name</th>
              <th>Parent Name</th>
              <th>Parent Email</th>
              <th>Parent Contact</th>
              <th>Address</th>
              <th>Batch</th>
              <th>Timing Type</th>
              <th>Timing</th>
              <th>Membership</th>
              <th>Payment</th>
              <th>Start Date</th>
              <th>Remaining</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {kidsMembers.length === 0 ? (
              <tr>
                <td colSpan="13" className="empty-members">
                  No kids batch members found.
                </td>
              </tr>
            ) : (
              kidsMembers.map((member) => (
                <tr key={member._id || member.id}>
                  <td>
                    <strong>{member.name || "-"}</strong>
                  </td>
                  <td>{member.parentName || "-"}</td>
                  <td>{member.parentEmail || member.email || "-"}</td>
                  <td>{member.parentContact || member.contact || "-"}</td>
                  <td>{member.address || "-"}</td>
                  <td>{member.batch || "-"}</td>
                  <td>{member.timingType || "-"}</td>
                  <td>{member.timing || "-"}</td>
                  <td>{member.membership || "-"}</td>
                  <td>{member.transactionType || "-"}</td>
                  <td>{formatDate(member.startDate || member.createdAt)}</td>
                  <td>
                    <span className="remaining-badge">
                      {getRemainingDays(member)} days
                    </span>
                  </td>
                  <td>
                    <button
                      className="member-delete-btn"
                      onClick={() =>
                        deleteMember(member._id || member.id, "kids")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div>
        <div className="members-header">
          <h1>Members Management</h1>
          <p>Loading members from backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="members-header">
        <h1>Members Management</h1>
        <p>View normal members and kids batch separately</p>
      </div>

      <div className="members-box">
        <h2>All Members ({members.length})</h2>
        {renderMembersTable()}
      </div>

      <div className="members-box">
        <h2>Kids Batch Members ({kidsMembers.length})</h2>
        {renderKidsTable()}
      </div>
    </div>
  );
}

export default MembersTab;