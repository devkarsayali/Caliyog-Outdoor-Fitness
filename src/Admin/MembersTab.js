import React, { useEffect, useState, useCallback } from "react";
import { FiUserPlus } from "react-icons/fi";
import "../style/Admin/MembersTab.css";
import AddMemberForm from "./AddMemberForm";

const API_URL = "https://caliyog-fitness-backend-production-2144.up.railway.app";

function MembersTab() {
  const [members, setMembers] = useState([]);
  const [kidsMembers, setKidsMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

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

  // ⭐ Fetch from backend
  const fetchFromBackend = useCallback(async () => {
    try {
      const token = getToken();

      const [memberResponse, kidsResponse] = await Promise.all([
        fetch(`${API_URL}/api/members`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }),
        fetch(`${API_URL}/api/batch-members`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }),
      ]);

      const memberData = await memberResponse.json();
      const kidsData = await kidsResponse.json();

      const allMembers = memberResponse.ok ? getArrayData(memberData) : [];
      const batchKids = kidsResponse.ok ? getArrayData(kidsData) : [];

      const normalMembers = allMembers.filter((m) => !isKidsMember(m));
      const kidsFromMembers = allMembers.filter((m) => isKidsMember(m));

      setMembers(normalMembers);
      setKidsMembers([...kidsFromMembers, ...batchKids]);
    } catch (error) {
      console.error("Load error:", error);
    }
  }, []);

  // ⭐ Add member to local state (frontend-only)
  const handleMemberAdded = (newMember) => {
    console.log("📥 Adding member to list:", newMember);

    if (!newMember) {
      fetchFromBackend();
      return;
    }

    // Check if it's a kids member
    if (isKidsMember(newMember)) {
      setKidsMembers((prev) => [newMember, ...prev]);
    } else {
      setMembers((prev) => [newMember, ...prev]);
    }
  };

  useEffect(() => {
    fetchFromBackend();

    // Listen for custom event
    const refreshMembers = () => {
      fetchFromBackend();
    };

    window.addEventListener("membersUpdated", refreshMembers);

    return () => {
      window.removeEventListener("membersUpdated", refreshMembers);
    };
  }, [fetchFromBackend]);

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
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const token = getToken();
      const url =
        type === "kids"
          ? `${API_URL}/api/batch-members/${id}`
          : `${API_URL}/api/members/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Member deleted successfully");
        fetchFromBackend();
      } else {
        alert(data.message || "Failed to delete member");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Backend connection failed");
    }
  };

  // ==================== DESKTOP TABLE ====================
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
                  <td><strong>{member.name || "-"}</strong></td>
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
                      onClick={() => deleteMember(member._id || member.id, "member")}
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
                  <td><strong>{member.name || "-"}</strong></td>
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
                      onClick={() => deleteMember(member._id || member.id, "kids")}
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

  // ==================== MOBILE CARDS ====================
  const renderMembersCards = () => {
    if (members.length === 0) {
      return <div className="empty-members">No members found.</div>;
    }

    return (
      <div className="members-cards">
        {members.map((member) => (
          <div className="member-card" key={member._id || member.id}>
            <div className="member-card-header">
              <h3>{member.name || "Unnamed"}</h3>
              <span className="remaining-badge">
                {getRemainingDays(member)} days
              </span>
            </div>

            <div className="member-card-body">
              <div className="member-card-row">
                <span className="member-card-label">Email</span>
                <span className="member-card-value">{member.email || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Contact</span>
                <span className="member-card-value">{member.contact || member.mobile || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Address</span>
                <span className="member-card-value">{member.address || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Batch</span>
                <span className="member-card-value">{member.batch || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Timing</span>
                <span className="member-card-value">{member.timingType || "-"} • {member.timing || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Membership</span>
                <span className="member-card-value">{member.membership || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Payment</span>
                <span className="member-card-value">{member.transactionType || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Start Date</span>
                <span className="member-card-value">{formatDate(member.startDate || member.createdAt)}</span>
              </div>
            </div>

            <div className="member-card-footer">
              <button className="member-delete-btn" onClick={() => deleteMember(member._id || member.id, "member")}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderKidsCards = () => {
    if (kidsMembers.length === 0) {
      return <div className="empty-members">No kids batch members found.</div>;
    }

    return (
      <div className="members-cards">
        {kidsMembers.map((member) => (
          <div className="member-card" key={member._id || member.id}>
            <div className="member-card-header">
              <h3>{member.name || "Unnamed"}</h3>
              <span className="remaining-badge">
                {getRemainingDays(member)} days
              </span>
            </div>

            <div className="member-card-body">
              <div className="member-card-row">
                <span className="member-card-label">Parent Name</span>
                <span className="member-card-value">{member.parentName || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Parent Email</span>
                <span className="member-card-value">{member.parentEmail || member.email || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Parent Contact</span>
                <span className="member-card-value">{member.parentContact || member.contact || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Address</span>
                <span className="member-card-value">{member.address || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Batch</span>
                <span className="member-card-value">{member.batch || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Timing</span>
                <span className="member-card-value">{member.timingType || "-"} • {member.timing || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Membership</span>
                <span className="member-card-value">{member.membership || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Payment</span>
                <span className="member-card-value">{member.transactionType || "-"}</span>
              </div>
              <div className="member-card-row">
                <span className="member-card-label">Start Date</span>
                <span className="member-card-value">{formatDate(member.startDate || member.createdAt)}</span>
              </div>
            </div>

            <div className="member-card-footer">
              <button className="member-delete-btn" onClick={() => deleteMember(member._id || member.id, "kids")}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      
        <button type="button" className="add-member-btn" onClick={() => setShowAddModal(true)}>
          <FiUserPlus /> Add Member
        </button>
      

      <div className="members-box">
        <h2>All Members ({members.length})</h2>
        <div className="members-desktop-view">{renderMembersTable()}</div>
        <div className="members-mobile-view">{renderMembersCards()}</div>
      </div>

      <div className="members-box">
        <h2>Kids Batch Members ({kidsMembers.length})</h2>
        <div className="members-desktop-view">{renderKidsTable()}</div>
        <div className="members-mobile-view">{renderKidsCards()}</div>
      </div>

      {showAddModal && (
        <AddMemberForm
          closeForm={() => setShowAddModal(false)}
          onMemberAdded={handleMemberAdded}
        />
      )}
    </div>
  );
}

export default MembersTab;