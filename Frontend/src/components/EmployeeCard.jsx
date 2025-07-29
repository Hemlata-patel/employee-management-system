import React, { useState } from "react";
import "./EmployeeCard.css";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => setShowHistory((prev) => !prev);

  const latestSalaryEntry =
    employee.salaryHistory?.[employee.salaryHistory.length - 1];

  return (
    <div className="employee-card">
      <div className="employee-info">
        <img
          className="employee-avatar"
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${employee.name}`}
          alt="avatar"
        />
        <div>
          <h3>{employee.name}</h3>
          <p><strong>Role:</strong> {employee.role}</p>
           <p><strong>Salary:</strong> 
          ₹{latestSalaryEntry ? latestSalaryEntry.amount.toLocaleString("en-IN") : "N/A"}</p>

          <button className="toggle-history-btn" onClick={toggleHistory}>
            {showHistory ? "Hide Salary History" : "Show Salary History"}
          </button>

          {showHistory && (
            <ul className="salary-history">
              {showHistory && (
                  <table className="salary-table">
                  <thead>
                    <tr>
                     <th>Amount (₹)</th>
                     <th>Date</th>
                     </tr>
                  </thead>
                  <tbody>
                     {employee.salaryHistory.map((entry) => (
                     <tr key={entry._id}>
                     <td>{entry.amount.toLocaleString("en-IN")}</td>
                     <td>{new Date(entry.date).toLocaleDateString()}</td>
                     </tr>
                     ))}
                  </tbody>
                 </table>
      
                )}
               </ul>
          )}
        </div>
      </div>

      <div className="employee-buttons">
        <button className="edit-btn" onClick={() => onEdit(employee._id)}>
          ✏️ Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(employee._id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
