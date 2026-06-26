# SPRY THERAPEUTICS PRIVATE LIMITED Assignment
# Candidate name: Maharaja K
# Task Management Dashboard

A simple task management app built with React.

## Features

- Add, edit, delete tasks
- Filter by status (All / Pending / In Progress / Completed)
- Sort by due date or title
- Status summary at the top
- Overdue detection
- Tasks saved to localStorage
- Two routes: All Tasks and Completed Tasks

## Stack

- React 18 (functional components + hooks)
- Context API + useReducer for state
- React Router v6 for routing
- localStorage for persistence
- Plain CSS (no UI library)

## Setup

```bash
npm install
npm start
```

## Structure

```
src/
├── context/TaskContext.jsx   # global state
├── components/
│   ├── TaskCard.jsx          # single task card
│   └── TaskForm.jsx          # add/edit modal
├── pages/
│   ├── AllTasks.jsx          # main view
│   └── Completed.jsx         # completed view
├── App.jsx                   # routes + nav
└── index.css                 # all styles
```
