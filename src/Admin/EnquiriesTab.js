import React, { useEffect, useState } from "react";
import { db } from "../utils/db";
import {
  FiMail,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

import "../style/Admin/EnquiriesTab.css";

function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState([]);

  const loadData = () => {
    setEnquiries(db.getEnquiries());
  };

  useEffect(() => {
    loadData();

    window.addEventListener(
      "caliyog_db_update",
      loadData
    );

    return () => {
      window.removeEventListener(
        "caliyog_db_update",
        loadData
      );
    };
  }, []);

  const markReplied = (id) => {
    db.updateEnquiryStatus(id, "Replied");
  };

  const deleteEnquiry = (id) => {
    const confirmDelete = window.confirm(
      "Delete this enquiry?"
    );

    if (confirmDelete) {
      db.deleteEnquiry(id);
    }
  };

  return (
    <div className="enquiry-page">

      <div className="enquiry-header">
        <div>
          <span className="enquiry-label">
            Contact Form Reports
          </span>

          <h2>User Enquiries</h2>

          <p>
            All enquiries submitted from the website
            contact form will appear here.
          </p>
        </div>
      </div>

      {enquiries.length === 0 ? (
        <div className="empty-enquiry-box">
          <FiMail />
          <h3>No Enquiries Yet</h3>
          <p>
            Contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="enquiry-grid">

          {enquiries.map((item) => (
            <div
              className="enquiry-card"
              key={item.id}
            >
              <div className="enquiry-top">
                <h3>{item.name}</h3>

                <span
                  className={
                    item.status === "Replied"
                      ? "status-replied"
                      : "status-new"
                  }
                >
                  {item.status}
                </span>
              </div>

              <div className="enquiry-details">

                <p>
                  <strong>Email:</strong>{" "}
                  {item.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {item.phone}
                </p>

                <p>
                  <strong>Message:</strong>
                </p>

                <div className="message-box">
                  {item.message}
                </div>

              </div>

              <div className="enquiry-footer">

                {item.status !== "Replied" && (
                  <button
                    className="reply-btn"
                    onClick={() =>
                      markReplied(item.id)
                    }
                  >
                    <FiCheckCircle />
                    Mark Replied
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteEnquiry(item.id)
                  }
                >
                  <FiTrash2 />
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default EnquiriesTab;