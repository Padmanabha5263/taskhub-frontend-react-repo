import React from "react";
import { Routes, Route, Navigate } from "react-router";
import CreateTask from "../pages/CreateTask";
import MyTasks from "../pages/MyTasks";
import { useAuth } from "react-oidc-context";
import Home from "../pages/Home";

const NavigationRoutes: React.FC = () => {
  const auth = useAuth();
  return (
    <Routes>
      <Route 
        path="/createTask" 
        element={auth.isAuthenticated ? <CreateTask /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/mytasks" 
        element={auth.isAuthenticated ? <MyTasks /> : <Navigate to="/" replace />} 
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default NavigationRoutes;
