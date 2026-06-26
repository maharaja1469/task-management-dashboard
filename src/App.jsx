import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import AllTasks from "./pages/AllTasks";
import Completed from "./pages/Completed";
import "./index.css";

export default function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <nav>
          <span>Task Dashboard</span>
          <NavLink to="/" end>All Tasks</NavLink>
          <NavLink to="/completed">Completed</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}
