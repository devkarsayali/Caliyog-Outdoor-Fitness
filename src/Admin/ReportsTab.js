import React, { useCallback, useEffect, useState } from "react";
import "../style/Admin/ReportsTab.css";

function ReportsTab() {
  const API_URL =
    "https://caliyog-fitness-backend-production-2144.up.railway.app";

  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    return localStorage.getItem("adminToken") || localStorage.getItem("token");
  };

  const safeJson = async (response) => {
    const text = await response.text();

    try {
      return text ? JSON.parse(text) : {};
    } catch {
      console.error("Non JSON Response:", text);
      return { message: text || "Invalid backend response" };
    }
  };

  const getArrayData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.joinRequests)) return data.joinRequests;
    if (Array.isArray(data.requests)) return data.requests;
    if (Array.isArray(data.result)) return data.result;
    return [];
  };

  const value = useCallback((...items) => {
    const found = items.find(
      (item) =>
        item !== undefined &&
        item !== null &&
        String(item).trim() !== ""
    );

    return found || "-";
  }, []);

  const isKidsRequest = useCallback(
    (item) => {
      const batch = String(value(item.batch, item.batchName, "")).toLowerCase();
      const membership = String(item.membership || "").toLowerCase();
      const type = String(value(item.type, item.memberType, "")).toLowerCase();

      return (
        batch.includes("kid") ||
        membership.includes("kid") ||
        type.includes("kid")
      );
    },
    [value]
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const token = getToken();

      const response = await fetch(`${API_URL}/api/join`, {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await safeJson(response);

      if (!response.ok) {
        alert(data.message || "Failed to load member requests");
        setAllRequests([]);
        return;
      }

      const requests = getArrayData(data);
      const normalMembers = requests.filter((item) => !isKidsRequest(item));

      setAllRequests(normalMembers);
    } catch (error) {
      console.error("Reports Load Error:", error);
      alert("Failed to load reports from backend");
      setAllRequests([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL, isKidsRequest]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addToMember = async (id) => {
    if (!id) {
      alert("Request ID not found");
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/api/join/add-to-member/${id}`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await safeJson(response);

      if (!response.ok) {
        alert(data.message || "Failed to add member");
        return;
      }

      alert(data.message || "Member Added Successfully");
      await loadData();
      window.dispatchEvent(new Event("membersUpdated"));
    } catch (error) {
      console.error("Add Member Error:", error);
      alert("Backend connection failed while adding member");
    }
  };

  const rejectRequest = async (id) => {
    if (!id) {
      alert("Request ID not found");
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/api/join/reject/${id}`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await safeJson(response);

      if (!response.ok) {
        alert(data.message || "Failed to reject request");
        return;
      }

      alert(data.message || "Request Rejected");
      await loadData();
    } catch (error) {
      console.error("Reject Error:", error);
      alert("Backend connection failed while rejecting request");
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString();
  };

  const getStatusClass = (status) => {
    if (status === "Added to Member") return "status-checked";
    if (status === "Rejected") return "status-rejected";
    return "status-new";
  };

  return (
    <div className="reports-container">
      
      <div className="report-box">
        <h2>All Member Requests ({allRequests.length})</h2>

          <div className="reports-desktop-view">
          <div className="report-table-wrapper">
            <table className="report-table">
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
                <th>Status</th>
                <th>Submitted On</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" className="empty-report">
                    Loading Requests...
                  </td>
                </tr>
              ) : allRequests.length === 0 ? (
                <tr>
                  <td colSpan="12" className="empty-report">
                    No Member Requests Found
                  </td>
                </tr>
              ) : (
                allRequests.map((item) => (
                  <tr key={item._id || item.id}>
                    <td>
                      <strong>
                        {value(item.name, item.memberName, item.fullName)}
                      </strong>
                    </td>

                    <td>{value(item.email)}</td>

                    <td>
                      {value(
                        item.contact,
                        item.mobile,
                        item.phone,
                        item.phoneNumber,
                        item.contactNumber
                      )}
                    </td>

                    <td>
                      {value(
                        item.address,
                        item.fullAddress,
                        item.location,
                        item.userAddress
                      )}
                    </td>

                    <td>
                      {value(
                        item.batch,
                        item.batchName,
                        item.selectedBatch,
                        item.batchType
                      )}
                    </td>

                    <td>
                      {value(
                        item.timingType,
                        item.timeType,
                        item.trainingType,
                        item.sessionType
                      )}
                    </td>

                    <td>
                      {value(
                        item.timing,
                        item.time,
                        item.batchTime,
                        item.selectedTiming
                      )}
                    </td>

                    <td>
                      <span className="membership-tag">
                        {value(
                          item.membership,
                          item.membershipPlan,
                          item.plan,
                          item.packageName
                        )}
                      </span>
                    </td>

                    <td>
                      {value(
                        item.transactionType,
                        item.payment,
                        item.paymentMode,
                        item.paymentType,
                        item.paymentMethod
                      )}
                    </td>

                    <td>
                      <span className={getStatusClass(item.status)}>
                        {value(item.status, "Pending")}
                      </span>
                    </td>

                    <td>
                      {formatDate(
                        item.createdAt || item.submittedOn || item.date
                      )}
                    </td>

                    <td>
                      <div className="report-action-box">
                        <button
                          type="button"
                          className="member-btn"
                          disabled={
                            item.status === "Added to Member" ||
                            item.status === "Rejected"
                          }
                          onClick={() => addToMember(item._id || item.id)}
                        >
                          {item.status === "Added to Member"
                            ? "Member Added"
                            : "Add Member"}
                        </button>

                        <button
                          type="button"
                          className="checked-btn"
                          disabled={
                            item.status === "Rejected" ||
                            item.status === "Added to Member"
                          }
                          onClick={() => rejectRequest(item._id || item.id)}
                        >
                          {item.status === "Rejected" ? "Rejected" : "Reject"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
                     </table>
          </div>
        </div>

        {/* ============= MOBILE CARDS VIEW ============= */}
        {allRequests.length > 0 && !loading && (
          <div className="reports-mobile-view">
            <div className="reports-cards">
              {allRequests.map((item) => (
                <div className="report-card-item" key={item._id || item.id}>
                  <div className="report-card-header">
                    <h3>
                      {value(item.name, item.memberName, item.fullName)}
                    </h3>
                    <span className={getStatusClass(item.status)}>
                      {value(item.status, "Pending")}
                    </span>
                  </div>

                  <div className="report-card-body">
                    <div className="report-card-row">
                      <span className="report-card-label">📧 Email</span>
                      <span className="report-card-value">
                        {value(item.email)}
                      </span>
                    </div>
                    <div className="report-card-row">
                      <span className="report-card-label">📞 Contact</span>
                      <span className="report-card-value">
                        {value(
                          item.contact,
                          item.mobile,
                          item.phone,
                          item.phoneNumber,
                          item.contactNumber
                        )}
                      </span>
                    </div>
                    <div className="report-card-row">
                      <span className="report-card-label">📍 Address</span>
                      <span className="report-card-value">
                        {value(
                          item.address,
                          item.fullAddress,
                          item.location,
                          item.userAddress
                        )}
                      </span>
                    </div>
                    <div className="report-card-row">
                      <span className="report-card-label">🏋️ Batch</span>
                      <span className="report-card-value">
                        {value(
                          item.batch,
                          item.batchName,
                          item.selectedBatch,
                          item.batchType
                        )}
                      </span>
                    </div>
                    <div className="report-card-row">
                      <span className="report-card-label">⏰ Timing</span>
                      <span className="report-card-value">
                        {value(
                          item.timingType,
                          item.timeType,
                          item.trainingType,
                          item.sessionType
                        )}{" "}
                        •{" "}
                        {value(
                          item.timing,
                          item.time,
                          item.batchTime,
                          item.selectedTiming
                        )}
                      </span>
                    </div>
                    <div className="report-card-row">
                      <span className="report-card-label">💳 Membership</span>
                      <span className="report-card-value">
                        <span className="membership-tag">
                          {value(
                            item.membership,
                            item.membershipPlan,
                            item.plan,
                            item.packageName
                          )}
                        </span>
                      </span>
                    </div>
                    <div className="report-card-row">
                      <span className="report-card-label">💰 Payment</span>
                      <span className="report-card-value">
                        {value(
                          item.transactionType,
                          item.payment,
                          item.paymentMode,
                          item.paymentType,
                          item.paymentMethod
                        )}
                      </span>
                    </div>
                    <div className="report-card-row">
                      <span className="report-card-label">📅 Submitted</span>
                      <span className="report-card-value">
                        {formatDate(
                          item.createdAt || item.submittedOn || item.date
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="report-card-footer">
                    <button
                      type="button"
                      className="member-btn"
                      disabled={
                        item.status === "Added to Member" ||
                        item.status === "Rejected"
                      }
                      onClick={() => addToMember(item._id || item.id)}
                    >
                      {item.status === "Added to Member"
                        ? "✓ Member Added"
                        : "✓ Add Member"}
                    </button>
                    <button
                      type="button"
                      className="checked-btn"
                      disabled={
                        item.status === "Rejected" ||
                        item.status === "Added to Member"
                      }
                      onClick={() => rejectRequest(item._id || item.id)}
                    >
                      {item.status === "Rejected" ? "✗ Rejected" : "✗ Reject"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportsTab;