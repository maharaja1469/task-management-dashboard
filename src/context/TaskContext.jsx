import React, { createContext, useContext, useReducer, useEffect } from "react";

const TaskContext = createContext();

const initialTasks = [
  {
    id: "1",
    title: "Set up project",
    description: "Initialize the repo and install dependencies.",
    status: "Completed",
    dueDate: "2025-06-10",
  },
  {
    id: "2",
    title: "Build UI components",
    description: "Create reusable card and form components.",
    status: "In Progress",
    dueDate: "2025-06-30",
  },
  {
    id: "3",
    title: "Write tests",
    description: "Cover main features with unit tests.",
    status: "Pending",
    dueDate: "2025-07-10",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload, id: Date.now().toString() }];
    case "UPDATE":
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    case "DELETE":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

function getInitialState() {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  } catch {
    return initialTasks;
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, null, getInitialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask    = (task)   => dispatch({ type: "ADD",    payload: task });
  const updateTask = (task)   => dispatch({ type: "UPDATE", payload: task });
  const deleteTask = (id)     => dispatch({ type: "DELETE", id });

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
