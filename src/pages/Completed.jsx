import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Completed() {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [editing, setEditing] = useState(null);

  const completed = tasks
    .filter((t) => t.status === "Completed")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  function handleSubmit(values) {
    updateTask({ ...editing, ...values });
    setEditing(null);
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: 16, fontSize: 18 }}>
        Completed Tasks ({completed.length})
      </h2>

      {completed.length === 0 ? (
        <div className="empty">No completed tasks yet.</div>
      ) : (
        <div className="task-grid">
          {completed.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setEditing}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      {editing && (
        <TaskForm
          initial={editing}
          onSubmit={handleSubmit}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
