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
  background-color: #f9f9f9;
  border-top: 1px solid #d3d3d3;
  position: fixed;
  bottom: 0;
  width: 100%;
`;
