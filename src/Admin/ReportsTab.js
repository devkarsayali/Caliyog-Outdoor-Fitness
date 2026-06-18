import React, { useEffect, useState } from "react";
import "../style/Admin/ReportsTab.css";
import { db } from "../utils/db";

function ReportsTab() {
  const [joinRequests, setJoinRequests] = useState([]);

  const loadData = () => {
    setJoinRequests(db.getJoinRequests());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("caliyog_db_update", loadData);

    return () => {
      window.removeEventListener("caliyog_db_update", loadData);
    };
  }, []);

  const markChecked = (id) => {
    db.updateJoinRequestStatus(id, "Checked");
  };

  const addToMember = (id) => {
    db.addMemberFromRequest(id);
  };

  const addToBatch = (id) => {
    db.addBatchMemberFromRequest(id);
  };

  return (
    <div>
      <div className="report-header">
        <h1>User Reports</h1>
        <p>Membership and Batch Registration Requests</p>
      </div>

      <div className="report-box">
        <h2>All User Requests</h2>

        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Membership</th>
                <th>Batch</th>
                <th>Timing</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {joinRequests.length === 0 ? (
                <tr>
                  <td colSpan="10" className="empty-report">
                    No user requests found
                  </td>
                </tr>
              ) : (
                joinRequests.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>

                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.address}</td>
                    <td>{item.membership}</td>
                    <td>{item.batch}</td>
                    <td>
                      {item.timingType} <br />
                      <span>{item.timing}</span>
                    </td>
                    <td>{item.transactionType}</td>

                    <td>
                      <span
                        className={
                          item.status === "Checked"
                            ? "status-checked"
                            : "status-new"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="report-action-box">
                        {item.status !== "Checked" && (
                          <button
                            className="checked-btn"
                            onClick={() => markChecked(item.id)}
                          >
                            Checked
                          </button>
                        )}

                        <button
                          className="member-btn"
                          disabled={item.memberAdded}
                          onClick={() => addToMember(item.id)}
                        >
                          {item.memberAdded ? "Member Added" : "Add Member"}
                        </button>

                        <button
                          className="batch-btn"
                          disabled={item.batchAdded}
                          onClick={() => addToBatch(item.id)}
                        >
                          {item.batchAdded ? "Batch Added" : "Add Batch"}
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
    </div>
  );
}

export default ReportsTab;