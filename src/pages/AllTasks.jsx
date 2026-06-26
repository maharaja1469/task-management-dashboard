import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const STATUSES = ["All", "Pending", "In Progress", "Completed"];

export default function AllTasks() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState("All");
  const [sort,   setSort]   = useState("dueDate");
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);

  const summary = {
    total:      tasks.length,
    pending:    tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed:  tasks.filter((t) => t.status === "Completed").length,
  };

  const visible = tasks
    .filter((t) => filter === "All" || t.status === filter)
    .sort((a, b) =>
      sort === "dueDate"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : a.title.localeCompare(b.title)
    );

  function handleEdit(task) {
    setEditing(task);
    setShowForm(true);
  }

  function handleSubmit(values) {
    if (editing) {
      updateTask({ ...editing, ...values });
      setEditing(null);
    } else {
      addTask(values);
    }
  }

  function handleClose() {
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div className="container">
      {/* Summary */}
      <div className="summary">
        <div className="summary-card">
          <div className="count">{summary.total}</div>
          <div className="label">Total</div>
        </div>
        <div className="summary-card">
          <div className="count">{summary.pending}</div>
          <div className="label">Pending</div>
        </div>
        <div className="summary-card">
          <div className="count">{summary.inProgress}</div>
          <div className="label">In Progress</div>
        </div>
        <div className="summary-card">
          <div className="count">{summary.completed}</div>
          <div className="label">Completed</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="dueDate">Sort by Due Date</option>
          <option value="title">Sort by Title</option>
        </select>

        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Task
        </button>
      </div>

      {/* Task list */}
      {visible.length === 0 ? (
        <div className="empty">No tasks found.</div>
      ) : (
        <div className="task-grid">
          {visible.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm
          initial={editing}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
