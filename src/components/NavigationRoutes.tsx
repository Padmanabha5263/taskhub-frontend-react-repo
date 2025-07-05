import React from "react";
import { Routes, Route } from "react-router";
// import CreateTask from "../pages/CreateTask";
import MyTasks from "../pages/MyTasks";
import { useAuth } from "react-oidc-context";

const NavigationRoutes: React.FC = () => {
  const auth = useAuth();
  return (
    <Routes>
      {/* <Route path="/createTask" element={<CreateTask />} /> */}
      {auth.isAuthenticated && <Route path="/mytasks" element={<MyTasks />} />}
    </Routes>
  );
};

export default NavigationRoutes;
