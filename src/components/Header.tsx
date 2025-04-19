import styled from "styled-components";
import logo from "../assets/images/logo.png";
import React from "react";
import { useAuth } from "react-oidc-context";
import CustomButton from "./common/CustomButton";

const HeaderContainer: any = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: space-between;
  height: 100px;
  background-color: #000;
  color: #fff;
  width: 100%;

  .flex-container {
    margin: 10px;
    padding: 20px;
    font-size: 30px;
  }
`;

const Header: React.FC = () => {
  const auth = useAuth();

  const signOutRedirect = async (): Promise<void> => {
    try {
      await auth.removeUser();
      const clientId = `${import.meta.env.VITE_COGNITO_CLIENTID}`;
      const logoutUri = `${import.meta.env.VITE_COGNITO_REDIRECTURI}`;
      const cognitoDomain = `${import.meta.env.VITE_COGNITO_CUSTOMDOMAIN}`;
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
        logoutUri
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
      <div className="logo-section flex-container">
        <img src={logo} alt="taskhub logo" height={50} width={50} />
      </div>
      <div className="app-name-section flex-container">TaskHub</div>
      {auth.isAuthenticated ? (
        <div className="logout-section flex-container">
          <CustomButton
            onClickFn={signOutRedirect}
            buttonName={"Logout"}
            height={"50px"}
            width={"70px"}
          />
        </div>
      ) : (
        <div className="login-section flex-container">
          <CustomButton
            onClickFn={signInRedirect}
            buttonName={"Signin"}
            height={"50px"}
            width={"70px"}
          />
        </div>
      )}
    </HeaderContainer>
  );
};

export default Header;
