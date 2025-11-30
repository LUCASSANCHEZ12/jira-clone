import { lazy, Suspense } from "react";
import AppLayout from "../components/layout/AppLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Login from "../components/LoginPage/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { Navigate } from "react-router";
import NotFound from "../components/common/NotFoundRoute";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/project",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound/>
      }
    ],
  }, 
  {
    // redirect any rout that is not matching  
    path: "*",
    element: <Navigate to="/project/dashboard" replace />,
  }
  
];
