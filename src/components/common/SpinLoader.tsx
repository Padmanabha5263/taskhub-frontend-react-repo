import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  position: fixed; /* Ensures it covers the entire viewport */
  top: 50;
  left: 50;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.5); /* Dim background with transparency */
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  z-index: 1000; /* Higher z-index to ensure it's in the foreground */
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #4caf50;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  /* Keyframes for spinning */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const SpinLoader: React.FC = () => {
  return (
    <LoaderContainer>
      <div className="loader"></div>
    </LoaderContainer>
  );
};

export default SpinLoader;
