import React from "react";
import styled from "styled-components";

const CustomButtonContainer = styled.button<{ height: string; width: string }>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

interface ButtonProps {
  onClickFn: () => void;
  buttonName: string;
  height: string;
  width: string;
}
const CustomButton: React.FC<ButtonProps> = ({
  onClickFn,
  buttonName,
  height,
  width,
}) => {
  return (
    <CustomButtonContainer onClick={onClickFn} height={height} width={width}>
      {buttonName || "CustomButton"}
    </CustomButtonContainer>
  );
};

export default CustomButton;
