import styled from "styled-components";
import OptionsIcon from "assets/optionsIcon/dots-circle-horizontal.svg";
import { useState } from "react";

export default function OptionsButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleClosePopup = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <StyledButton onClick={handleClick}>
        <OptionsIcon />
      </StyledButton>
      {isMenuOpen && (
        <StyledPopupMenu>
          <StyledCloseButton onClick={handleClosePopup}>×</StyledCloseButton>
        </StyledPopupMenu>
      )}
    </>
  );
}

const StyledButton = styled.button`
  position: absolute;
  bottom: -4px;
  right: 5px;
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-secondary);

  body.dark-theme & {
    color: var(--color-secondary);
  }
`;

const StyledPopupMenu = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 8px;
  right: 16px;
  width: 30%;
  height: 50%;
  border-radius: 8px;
  background-color: var(--color-secondary);
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-background-cards);
  cursor: pointer;
`;
