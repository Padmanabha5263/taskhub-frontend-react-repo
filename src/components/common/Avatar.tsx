import React from "react";
import styled from "styled-components";

const AvatarContainer = styled.div`
  background-color: blue;
  border: 1px solid;
  border-radius: 50%;
  padding: 12px;
`;

interface AvatarProps {
  name: string;
}
const Avatar: React.FC<AvatarProps> = ({ name }) => {
  return <AvatarContainer>{name}</AvatarContainer>;
};

export default Avatar;
