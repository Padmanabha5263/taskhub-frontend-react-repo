import React from "react";
import styled from "styled-components";

const AvatarContainer = styled.div`
  background-color: blue;
  border: 1px solid;
  border-radius: 50%;
  padding: 12px;
`;
function Avatar({ name: string }) {
  return <AvatarContainer>Avatar</AvatarContainer>;
}

export default Avatar;
