import React from "react";

const badgeClass = {
  Pending:     "badge badge-pending",
  "In Progress": "badge badge-progress",
  Completed:   "badge badge-completed",
};

function isOverdue(dueDate, status) {
  if (status === "Completed") return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export default function TaskCard({ task, onEdit, onDelete }) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="task-card">
      <div className="card-header">
        <h3>{task.title}</h3>
        <span className={badgeClass[task.status]}>{task.status}</span>
      </div>

      {task.description && <p>{task.description}</p>}

      <div className={`due ${overdue ? "overdue" : ""}`}>
        Due: {task.dueDate}{overdue ? " · Overdue" : ""}
      </div>

      <div className="card-actions">
        <button className="btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
