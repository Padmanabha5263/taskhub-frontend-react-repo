import React from "react";
import { Routes, Route } from "react-router";
import CreateTask from "../pages/CreateTask";
import MyTasks from "../pages/MyTasks";

const NavigationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/createTask" Component={CreateTask} />
      <Route path="/mytasks" Component={MyTasks} />
    </Routes>
  );
};

export default NavigationRoutes;
