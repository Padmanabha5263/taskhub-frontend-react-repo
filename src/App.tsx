import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import NavigationRoutes from "./components/NavigationRoutes";
import styled from "styled-components";
import { useAuth } from "react-oidc-context";
import SpinLoader from "./components/common/SpinLoader";

const AppContainer = styled.div`
  .navigator {
    position: relative;
    top: 100px;
    left: 350px;
    padding: 20px;
  }
`;
const App: React.FC = () => {
  const auth = useAuth();
  if (auth.isLoading) {
    return <SpinLoader />;
  }
  if (auth.error) {
    console.log("Encountering error...", auth.error.message);
    return <SpinLoader />;
  }

  return (
    <AppContainer>
      <div className="common">
        <Header />
        <SideBar />
      </div>
      <div className="navigator">
        <NavigationRoutes />
      </div>
    </AppContainer>
  );
};

export default App;
