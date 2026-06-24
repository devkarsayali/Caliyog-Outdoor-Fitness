import React, { useCallback, useEffect, useState } from "react";
import "../style/Admin/ReportsTab.css";

function ReportsTab() {
  const API_URL = "http://192.168.11.5:5000";

  const [allRequests, setAllRequests] = useState([]);
  const [kidsRequests, setKidsRequests] = useState([]);
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

  const splitRequests = useCallback(
    (requests) => {
      const normal = requests.filter((item) => !isKidsRequest(item));
      const kids = requests.filter((item) => isKidsRequest(item));

      setAllRequests(normal);
      setKidsRequests(kids);
    },
    [isKidsRequest]
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

      console.log("JOIN REQUEST RESPONSE:", data);

      if (!response.ok) {
        alert(data.message || "Failed to load join requests");
        splitRequests([]);
        return;
      }

      const requests = getArrayData(data);
      splitRequests(requests);
    } catch (error) {
      console.error("Reports Load Error:", error);
      alert("Failed to load reports from backend");
      splitRequests([]);
    } finally {
      setLoading(false);
    }
  }, [API_URL, splitRequests]);

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

  const renderNormalTable = () => {
    return (
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
                    {formatDate(item.createdAt || item.submittedOn || item.date)}
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
    );
  };

  const renderKidsTable = () => {
    return (
      <div className="report-table-wrapper">
        <table className="report-table">
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
              <th>Status</th>
              <th>Submitted On</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="13" className="empty-report">
                  Loading Kids Requests...
                </td>
              </tr>
            ) : kidsRequests.length === 0 ? (
              <tr>
                <td colSpan="13" className="empty-report">
                  No Kids Batch Requests Found
                </td>
              </tr>
            ) : (
              kidsRequests.map((item) => (
                <tr key={item._id || item.id}>
                  <td>
                    <strong>
                      {value(item.name, item.kidName, item.childName)}
                    </strong>
                  </td>

                  <td>
                    {value(item.parentName, item.fatherName, item.guardianName)}
                  </td>

                  <td>{value(item.parentEmail, item.email)}</td>

                  <td>
                    {value(
                      item.parentContact,
                      item.contact,
                      item.mobile,
                      item.phone,
                      item.parentMobile
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
                    {formatDate(item.createdAt || item.submittedOn || item.date)}
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
                          ? "Kid Added"
                          : "Add Kid"}
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
    );
  };

  return (
    <div className="reports-container">
      <div className="report-header">
        <span className="report-label">Reports Management</span>
        <h1>User Registration Reports</h1>
        <p>Separate normal member requests and kids batch requests.</p>
      </div>

      <div className="report-box">
        <h2>All Member Requests ({allRequests.length})</h2>
        {renderNormalTable()}
      </div>

      <div className="report-box">
        <h2>Kids Batch Requests ({kidsRequests.length})</h2>
        {renderKidsTable()}
      </div>
    </div>
  );
}

export default ReportsTab;