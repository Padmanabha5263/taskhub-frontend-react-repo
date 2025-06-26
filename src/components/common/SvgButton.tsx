import React from "react";
import styled from "styled-components";

const SvgButtonContainer = styled.button<{ height: string; width: string }>``;

interface SvgButtonProps {
  icon: React.ReactNode;
  btnText: string;
  onClickFn: () => void;
  height: string;
  width: string;
}
const SvgButton: React.FC<SvgButtonProps> = ({
  btnText,
  onClickFn,
  height,
  width,
}) => {
  return (
    <SvgButtonContainer onClick={onClickFn} height={height} width={width}>
      {btnText}
    </SvgButtonContainer>
  );
};

export default SvgButton;
