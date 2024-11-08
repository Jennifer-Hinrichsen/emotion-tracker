import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

export default function Navigation() {
  return (
    <StyledNavigationBar>
      <Link href="/">Test</Link>
      <CenterWrapper>
        <Link href="/">
          <LogoCanvas>
            <Image src="/moodwave-logo.svg" alt="Logo" width={50} height={50} />
          </LogoCanvas>
        </Link>
      </CenterWrapper>
      <Link href="/bookmarks">My Emotions</Link>
    </StyledNavigationBar>
  );
}

const StyledNavigationBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-top: 1px solid #d3d3d3;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
`;

const CenterWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const LogoCanvas = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 50%;
  border: 2px solid #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 50px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
