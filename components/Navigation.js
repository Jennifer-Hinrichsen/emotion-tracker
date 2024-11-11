import Link from "next/link";
import styled from "styled-components";

export default function Navigation() {
  return (
    <StyledNavigationBar>
      <Link href="/">Home</Link>
      <Link href="/bookmarks">My Emotions</Link>
    </StyledNavigationBar>
  );
}

const StyledNavigationBar = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-border);
  position: fixed;
  bottom: 0;
  width: 100%;
`;
