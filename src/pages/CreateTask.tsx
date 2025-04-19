import React from "react";
import { useAuth } from "react-oidc-context";

const CreateTask: React.FC = () => {
  const auth: any = useAuth();
  return (
    <div>
      {auth.isAuthenticated && (
        <div>
          Hello: {auth.user?.profile.email}
          {/* ID Token: {auth.user?.id_token}
          Access Token: {auth.user?.access_token}
          Refresh Token: {auth.user?.refresh_token} */}
        </div>
      )}
    </div>
  );
};

export default CreateTask;
