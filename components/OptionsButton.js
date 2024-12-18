import styled from "styled-components";
import OptionsIcon from "assets/optionsIcon/dots-circle-horizontal.svg";
import OptionsMenu from "./OptionsMenu";
export default function OptionsButton({
  onDeleteEmotion,
  emotion,
  isMenuOpen,
  onToggleMenu,
}) {
  return (
    <>
      <StyledButton onClick={onToggleMenu}>
        <OptionsIcon />
      </StyledButton>
      {isMenuOpen && (
        <OptionsMenu
          onClose={onToggleMenu}
          onDeleteEmotion={onDeleteEmotion}
          emotion={emotion}
          isMenuOpen={isMenuOpen}
          onToggleMenu={onToggleMenu}
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
