import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

export default function Navigation() {
  return (
    <StyledNavigationBar>
      <LinkStyled href="/bookmarks">My Emotions</LinkStyled>
      <CenterWrapper>
        <Link href="/" passHref>
          <LogoCanvas>
            <Image src="/moodwave-logo.svg" alt="Logo" width={45} height={45} />
            <HomeText>Home</HomeText>
          </LogoCanvas>
        </Link>
      </CenterWrapper>
      <LinkStyled href="/bookmarks">My Emotions</LinkStyled>
    </StyledNavigationBar>
  );
}

const StyledNavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #e0e1f0;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  gap: 20px;
`;

const CenterWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const LogoCanvas = styled.div`
  color: #313366;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #313366;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 50px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    margin-bottom: 2px;
    margin-left: 4px;
  }
`;

const LinkStyled = styled.a`
  color: #313366;
  font-size: 16px;
  padding: 10px;

  &:hover {
    color: #5b6c9f;
  }
`;
const HomeText = styled.span`
  font-size: 16px;
  font-weight: normal;
  color: #313366;
  margin-bottom: 20px;
`;
