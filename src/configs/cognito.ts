export const cognitoAuthConfig: any = {
  authority: `${import.meta.env.VITE_COGNITO_AUTHORITY}`,
  client_id: `${import.meta.env.VITE_COGNITO_CLIENTID}`,
  redirect_uri: `${import.meta.env.VITE_COGNITO_REDIRECTURI}`,
  response_type: `${import.meta.env.VITE_COGNITO_RESPONSETYPE}`,
  scope: "phone openid email",
  loadUserInfo: true, // Automatically loads user profile data
  automaticSilentRenew: true, // Automatically renews tokens before they expire
  includeIdTokenInSilentRenew: true,
};
