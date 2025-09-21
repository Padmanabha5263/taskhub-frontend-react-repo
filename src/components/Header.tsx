import styled from "styled-components";
import logo from "../assets/images/logo.png";
import React from "react";
import { useAuth } from "react-oidc-context";
import CustomButton from "./common/CustomButton";
import { useNavigate } from "react-router";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: white;
  width: 100vw;
  max-width: 100%;
  z-index: 1001;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;

  .left-section {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-shrink: 0;
    min-width: 0;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    img {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  }

  .app-name {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(45deg, #fff, #f0f8ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 480px) {
      font-size: 1.4rem;
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-shrink: 0;

    @media (max-width: 480px) {
      gap: 8px;
    }
  }

  .menu-button {
    display: none;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 8px 12px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      display: block;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    opacity: 0.9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const auth = useAuth();
  const navigate = useNavigate();




  const signOutRedirect = async (): Promise<void> => {
    try {
      await auth.removeUser();
      window.location.href = `${
        import.meta.env.VITE_COGNITO_CUSTOMDOMAIN
      }/logout?client_id=${
        import.meta.env.VITE_COGNITO_CLIENTID
      }&logout_uri=${encodeURIComponent(
        import.meta.env.VITE_COGNITO_REDIRECTURI
      )}`;
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const signInRedirect = async (): Promise<void> => {
    try {
      await auth.signinRedirect();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <HeaderContainer>
      <div className="left-section">
        <button className="menu-button" onClick={onMenuToggle}>
          ☰
        </button>
        <div className="logo-section" onClick={() => navigate("/")}>
          <img src={logo} alt="TaskHub Logo" height={40} width={40} />
          <span className="app-name">TaskHub</span>
        </div>
      </div>

      <div className="right-section">
        {auth.isAuthenticated && auth.user?.profile && (
          <div className="user-info">
            Welcome, {auth.user.profile.given_name || auth.user.profile.email}
          </div>
        )}

        {auth.isAuthenticated ? (
          <>
            <CustomButton
              onClickFn={signOutRedirect}
              buttonName="Logout"
              height="40px"
              width="80px"
            />
          </>
        ) : (
          <CustomButton
            onClickFn={signInRedirect}
            buttonName="Sign In"
            height="40px"
            width="80px"
          />
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
