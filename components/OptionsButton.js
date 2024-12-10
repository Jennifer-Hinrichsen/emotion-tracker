import styled from "styled-components";
import OptionsIcon from "assets/optionsIcon/dots-circle-horizontal.svg";
import { useState } from "react";
import OptionsMenu from "./OptionsMenu";

export default function OptionsButton({ onDeleteEmotion, emotion }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(true);
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
        <OptionsMenu
          onClose={handleClosePopup}
          onDeleteEmotion={onDeleteEmotion}
          emotion={emotion}
        />
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
