import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router";

const SideBarContainer: any = styled.div`
  position: fixed;
  width: 300px;
  top: 100px;
  left: 0px;
  height: calc(100vh - 100px);
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
  font-size: 20px;
  .nav-links {
    margin-bottom: 20px;
  }
`;
const SideBar: React.FC = () => {
  return (
    <SideBarContainer>
      <nav className="nav-links">
        <NavLink to="/createTask">Create Task</NavLink>
      </nav>
      <nav className="nav-links">
        <NavLink to="/mytasks">My Tasks</NavLink>
      </nav>
    </SideBarContainer>
  );
};

export default SideBar;
