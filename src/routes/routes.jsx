import { lazy, Suspense } from "react";
import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Login from "../components/LoginPage/Login";
import Dashboard from "../components/Dashboard/Dashboard";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "project/dashboard",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  }
  
];
