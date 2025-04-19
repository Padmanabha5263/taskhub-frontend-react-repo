import React from "react";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";

const SideBarContainer: any = styled.div`
  width: 300px;
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;
`;
const SideBar: React.FC = () => {
  return (
    <SideBarContainer>
      <nav>
        <ul>
          <li>
            <Link to="/">Create Task</Link>
          </li>
          <li>
            <Link to="/blogs">My Tasks</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </SideBarContainer>
  );
};

export default SideBar;
