import styled from "styled-components";
import logo from "../assets/images/logo.png";
import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import CustomButton from "./common/CustomButton";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      // If phone number is not verified, redirect to verification
      if (!auth.user.profile.phone_number_verified) {
        handleMobileVerification();
      }
    }
  }, [auth.isAuthenticated, auth.user]);

  const handleMobileVerification = () => {
    // Redirect to Cognito hosted UI for phone verification
    window.location.href = `${
      import.meta.env.VITE_COGNITO_CUSTOMDOMAIN
    }/oauth2/authorize?client_id=${
      import.meta.env.VITE_COGNITO_CLIENTID
    }&response_type=code&scope=openid+phone&redirect_uri=${encodeURIComponent(
      import.meta.env.VITE_COGNITO_REDIRECTURI
    )}&state=phone_verification`;
  };

  const resendMobileOTP = async () => {
    try {
      // Log user info for debugging
      console.log("User phone:", auth.user?.profile.phone_number);
      console.log("Phone verified:", auth.user?.profile.phone_number_verified);

      // Force logout and re-login to trigger new OTP
      await auth.removeUser();

      // Redirect to sign in with phone verification
      window.location.href = `${
        import.meta.env.VITE_COGNITO_CUSTOMDOMAIN
      }/oauth2/authorize?client_id=${
        import.meta.env.VITE_COGNITO_CLIENTID
      }&response_type=code&scope=openid+phone&redirect_uri=${encodeURIComponent(
        import.meta.env.VITE_COGNITO_REDIRECTURI
      )}&prompt=login`;
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

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
      <div className="logo-section flex-container">
        <img
          src={logo}
          alt="taskhub logo"
          height={50}
          width={50}
          onClick={() => {
            navigate("/createTask");
          }}
        />
      </div>
      <div className="app-name-section flex-container">TaskHub</div>
      {auth.isAuthenticated ? (
        <div className="logout-section flex-container">
          {!auth.user?.profile.phone_number_verified ? (
            <CustomButton
              onClickFn={resendMobileOTP}
              buttonName={"Verify Mobile"}
              height={"50px"}
              width={"100px"}
            />
          ) : null}
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
