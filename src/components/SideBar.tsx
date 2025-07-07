import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router";
import { useAuth } from "react-oidc-context";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 280px;
  top: 80px;
  left: ${props => props.isOpen ? '0px' : '-280px'};
  height: calc(100vh - 80px);
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow-y: auto;
  
  @media (min-width: 769px) {
    left: 0px;
  }
`;

const SideBarHeader = styled.div`
  padding: 24px 20px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NavSection = styled.nav`
  padding: 20px 0;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  margin: 4px 12px;
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    transform: translateX(4px);
  }
  
  &.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 20px;
      background: white;
      border-radius: 0 4px 4px 0;
    }
  }
  
  .icon {
    font-size: 1.2rem;
    min-width: 20px;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};
  backdrop-filter: blur(2px);
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const UserProfile = styled.div`
  padding: 16px 20px;
  margin: 12px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
  
  .user-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }
  
  .user-email {
    font-size: 0.8rem;
    color: #64748b;
  }
`;

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const auth = useAuth();
  
  if (!auth.isAuthenticated) return null;
  
  const getUserInitials = () => {
    const name = auth.user?.profile?.given_name || auth.user?.profile?.email || 'U';
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SideBarContainer isOpen={isOpen}>
        <SideBarHeader>
          <h3>Navigation</h3>
        </SideBarHeader>
        
        <UserProfile>
          <div className="user-avatar">
            {getUserInitials()}
          </div>
          <div className="user-name">
            {auth.user?.profile?.given_name || 'User'}
          </div>
          <div className="user-email">
            {auth.user?.profile?.email}
          </div>
        </UserProfile>
        
        <NavSection>
          <NavItem to="/createTask" onClick={onClose}>
            <span className="icon">➕</span>
            Create Task
          </NavItem>
          <NavItem to="/mytasks" onClick={onClose}>
            <span className="icon">📋</span>
            My Tasks
          </NavItem>
        </NavSection>
      </SideBarContainer>
    </>
  );
};

export default SideBar;
