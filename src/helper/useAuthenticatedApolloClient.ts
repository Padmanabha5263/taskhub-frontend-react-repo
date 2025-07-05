import { useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAuth } from "react-oidc-context";

export const useAuthenticatedApolloClient = () => {
  const auth = useAuth();

  return useMemo(() => {
    const httpLink = createHttpLink({
      uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    });

    const authLink = setContext(async (_, { headers }) => {
      let token = auth.user?.access_token;
      
      // Check if token is expired
      if (auth.user && auth.user.expires_at && auth.user.expires_at < Date.now() / 1000) {
        try {
          await auth.signinSilent();
          token = auth.user?.access_token;
        } catch (error) {
          console.error('Token refresh failed:', error);
          auth.signinRedirect();
          return { headers };
        }
      }
      
      return {
        headers: {
          ...headers,
          ...(token && { authorization: `Bearer ${token}` }),
        },
      };
    });

    const errorLink = onError(({ networkError }) => {
      if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
        auth.signinRedirect();
      }
    });

    return new ApolloClient({
      link: errorLink.concat(authLink).concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [auth.user?.access_token, auth.signinSilent, auth.signinRedirect]);
};
