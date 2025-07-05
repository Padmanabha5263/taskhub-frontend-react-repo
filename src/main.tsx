import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-oidc-context";
import { cognitoAuthConfig } from "./configs/cognito.ts";
import { BrowserRouter } from "react-router";
import { ApolloProvider } from "@apollo/client";
import { useAuthenticatedApolloClient } from "./helper/useAuthenticatedApolloClient.ts";

const AppWithProviders = () => {
  const client = useAuthenticatedApolloClient();
  
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <AppWithProviders />
    </AuthProvider>
  </StrictMode>
);
