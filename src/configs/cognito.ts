export const cognitoAuthConfig: any = {
  authority: `${import.meta.env.VITE_COGNITO_AUTHORITY}`,
  client_id: `${import.meta.env.VITE_COGNITO_CLIENTID}`,
  redirect_uri: `${import.meta.env.VITE_COGNITO_REDIRECTURI}`,
  response_type: `${import.meta.env.VITE_COGNITO_RESPONSETYPE}`,
  scope: "email openid profile",  
};
