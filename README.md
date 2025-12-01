# React Jira Clone – Personal Project

This is a **personal project** built with **React + Vite**, inspired by **Jira**.  
The goal is to recreate a simplified task-management experience with a clean UI, drag-and-drop interaction, and a very lightweight authentication flow.

The application includes:
- A **simple login page** (no backend required).
- A **Kanban-style board** with draggable tasks.
- State persisted in **localStorage** for easy testing.

---

## 🚀 Tech Stack & Dependencies

### **Frontend**
- **React 19** – UI library.
- **React DOM** – Rendering for web applications.
- **React Router / React Router DOM** – For client-side routing.

### **State Management**
- **Redux Toolkit**
- **React Redux**

### **Styling**
- **Material UI (MUI)**  
  - `@mui/material` – Core components  
  - `@mui/icons-material` – Icons  
  - `@emotion/react`, `@emotion/styled` – Emotion engine used by MUI  
- **styled-components** – Additional styling flexibility.

### **Drag & Drop**
Using the **@dnd-kit** ecosystem:
- `@dnd-kit/core` – Base drag-and-drop engine  
- `@dnd-kit/sortable` – Utilities for sortable lists  
- `@dnd-kit/modifiers` – Behavior modifiers (snap, restrict, etc.)

### **Development Tools**
- **Vite** – Fast dev server & bundler.
- **ESLint** (+ plugins) – Linting and code quality.
- **@vitejs/plugin-react** – React fast refresh + JSX support.

---

## 📦 Project Setup & Scripts

Make sure you have **Node.js** and **npm** installed.

### **Install dependencies**
```bash
npm install
```

## Start development server
```bash
npm run dev
```
Runs the project at `http://localhost:5173/`.

## Build for production
```bash
npm run build
```

## 🔐 Login Credentials & Data Storage
This project **does not use a backend.**
All information (user session, tasks, board state) is stored in localStorage.

To log in, use the following test credentials:

```plaintext
Email: john@mail.com
Password: changeme
```
## 👤 Author
[LUCASSANCHEZ12](https://github.com/LUCASSANCHEZ12/)

