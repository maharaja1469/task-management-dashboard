import React, { useState, useEffect } from "react";

const empty = { title: "", description: "", status: "Pending", dueDate: "" };

export default function TaskForm({ initial, onSubmit, onClose }) {
  const [form, setForm]     = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial || empty);
    setErrors({});
  }, [initial]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.dueDate)      errs.dueDate = "Due date is required.";
    if (Object.keys(errs).length) return setErrors(errs);

    onSubmit(form);
    onClose();
  }

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2>{initial ? "Edit Task" : "New Task"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Task title"
              className={errors.title ? "error-input" : ""}
              autoFocus
            />
            {errors.title && <div className="error-msg">{errors.title}</div>}
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optional details"
              rows={3}
            />
          </div>

          <div className="field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="field">
            <label>Due Date *</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className={errors.dueDate ? "error-input" : ""}
            />
            {errors.dueDate && <div className="error-msg">{errors.dueDate}</div>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initial ? "Save" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
