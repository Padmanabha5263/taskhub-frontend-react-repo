import React, { useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NavigationRoutes from "./components/NavigationRoutes";
import styled from "styled-components";
import { useAuth } from "react-oidc-context";
import SpinLoader from "./components/common/SpinLoader";

const AppContainer = styled.div<{ isAuthenticated: boolean }>`
  .navigator {
    position: ${(props) => (props.isAuthenticated ? "fixed" : "static")};
    top: ${(props) => (props.isAuthenticated ? "80px" : "0")};
    left: ${(props) => (props.isAuthenticated ? "280px" : "0")};
    width: ${(props) =>
      props.isAuthenticated ? "calc(100vw - 280px)" : "100vw"};
    height: ${(props) =>
      props.isAuthenticated ? "calc(100vh - 80px)" : "100vh"};
    overflow-y: auto;
    background: ${(props) => (props.isAuthenticated ? "#f8fafc" : "transparent")};

    @media (max-width: 768px) {
      left: 0;
      width: 100vw;
      top: ${(props) => (props.isAuthenticated ? "80px" : "0")};
      height: ${(props) =>
        props.isAuthenticated ? "calc(100vh - 80px)" : "100vh"};
    }
  }
  
  .content-wrapper {
    padding: ${(props) => (props.isAuthenticated ? "24px" : "0")};
    min-height: 100%;
    box-sizing: border-box;
    
    @media (max-width: 768px) {
      padding: ${(props) => (props.isAuthenticated ? "16px" : "0")};
    }
  }
`;

const App: React.FC = () => {
  const auth = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (auth.isLoading) {
    return <SpinLoader />;
  }
  if (auth.error) {
    console.log("Encountering error...", auth.error.message);
    return <SpinLoader />;
  }

  return (
    <AppContainer isAuthenticated={auth.isAuthenticated}>
      {auth.isAuthenticated && (
        <div className="common">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
      )}
      <div className="navigator">
        <div className="content-wrapper">
          <NavigationRoutes />
        </div>
      </div>
    </AppContainer>
  );
};

export default App;
