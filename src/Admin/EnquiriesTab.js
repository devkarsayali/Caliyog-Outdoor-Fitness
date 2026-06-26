import React, { useEffect, useState } from "react";
import {
  FiMail,
  FiTrash2,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";

import "../style/Admin/EnquiriesTab.css";

function EnquiriesTab() {
  const API_URL =
  "https://caliyog-fitness-backend-production.up.railway.app";

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("adminToken") || localStorage.getItem("token");
  };

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: getToken() ? `Bearer ${getToken()}` : "",
  });

  const safeJson = async (response) => {
    const text = await response.text();

    try {
      return text ? JSON.parse(text) : {};
    } catch {
      console.error("Non JSON Response:", text);
      return {};
    }
  };

  const getArrayData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.contacts)) return data.contacts;
    if (Array.isArray(data.enquiries)) return data.enquiries;
    if (Array.isArray(data.messages)) return data.messages;
    if (Array.isArray(data.result)) return data.result;
    return [];
  };

  const getValue = (...values) => {
    const found = values.find(
      (value) =>
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
    );

    return found || "-";
  };

  const getContactNumber = (item) => {
    return getValue(
      item.contact,
      item.mobile,
      item.phone,
      item.number,
      item.contactNumber,
      item.phoneNumber,
      item.mobileNumber,
      item.userContact,
      item.userPhone,
      item.whatsapp,
      item.whatsappNumber
    );
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/contacts`, {
        headers: getAuthHeaders(),
      });

      const data = await safeJson(response);
      console.log("CONTACT API DATA:", data);

      if (response.ok) {
        setEnquiries(getArrayData(data));
      } else {
        alert(data.message || "Failed to load enquiries");
      }
    } catch (error) {
      console.error("Load Enquiry Error:", error);
      alert("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markReplied = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/contacts/${id}/reply`, {
        method: "PUT",
        headers: getAuthHeaders(),
      });

      const data = await safeJson(response);

      if (response.ok) {
        alert(data.message || "Enquiry marked as replied");
        loadData();
      } else {
        alert(data.message || "Failed to update enquiry");
      }
    } catch (error) {
      console.error("Update Enquiry Error:", error);
      alert("Failed to update enquiry");
    }
  };

  const deleteEnquiry = async (id) => {
    const confirmDelete = window.confirm("Delete this enquiry?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/contacts/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await safeJson(response);

      if (response.ok) {
        alert(data.message || "Enquiry deleted successfully");
        loadData();
      } else {
        alert(data.message || "Failed to delete enquiry");
      }
    } catch (error) {
      console.error("Delete Enquiry Error:", error);
      alert("Failed to delete enquiry");
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString();
  };

  return (
    <div className="enquiry-page">
      <div className="enquiry-header">
        <div>
          <span className="enquiry-label">Contact Form Reports</span>

          <h2>User Enquiries</h2>

          <p>
            All enquiries submitted from the website contact form will appear
            here.
          </p>
        </div>

        <button className="refresh-btn" onClick={loadData}>
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="empty-enquiry-box">
          <h3>Loading Enquiries...</h3>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="empty-enquiry-box">
          <FiMail />
          <h3>No Enquiries Yet</h3>
          <p>Contact form submissions will appear here.</p>
        </div>
      ) : (
        <div className="admin-table-box">
          <table className="enquiry-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {enquiries.map((item, index) => (
                <tr key={item._id || item.id}>
                  <td>{index + 1}</td>

                  <td>
                    {getValue(
                      item.name,
                      item.fullName,
                      item.userName,
                      item.memberName
                    )}
                  </td>

                  <td>{getValue(item.email, item.userEmail)}</td>

                  <td>{getContactNumber(item)}</td>

                  <td className="message-cell">
                    {getValue(item.message, item.msg, item.description)}
                  </td>

                  <td>
                    <span
                      className={
                        item.status === "Replied"
                          ? "status-replied"
                          : "status-new"
                      }
                    >
                      {item.status || "New"}
                    </span>
                  </td>

                  <td>
                    {formatDate(
                      item.createdAt || item.date || item.submittedOn
                    )}
                  </td>

                  <td className="action-cell">
                    {item.status !== "Replied" && (
                      <button
                        type="button"
                        className="reply-btn"
                        onClick={() => markReplied(item._id || item.id)}
                      >
                        <FiCheckCircle />
                      </button>
                    )}

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteEnquiry(item._id || item.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EnquiriesTab;