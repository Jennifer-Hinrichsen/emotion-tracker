import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import BookmarkIcon from "assets/bookmarkicons/Bookmark-filled.svg";
import MoodwaveLogo from "assets/moodwave-logo.svg";

export default function Navigation() {
  const { pathname } = useRouter();
  const isActive = (page) => pathname === page;

  console.log(MoodwaveLogo);
  return (
    <StyledNavigationBar>
      <StyledLink href="/bookmarks">
        <IconWrapper $isActive={isActive("/bookmarks")}>
          <StyledBookmarkIcon
            $isActive={isActive("/bookmarks")}
            src="/Bookmark-filled.svg"
            alt="Bookmark Icon"
          />
          <BookmarkText>My Emotions</BookmarkText>
        </IconWrapper>
      </StyledLink>
      <CenterWrapper>
        <Link href="/">
          <LogoCanvas $isActive={isActive("/")}>
            <StyledLogo />
            <HomeText>Home</HomeText>
          </LogoCanvas>
        </Link>
      </CenterWrapper>
    </StyledNavigationBar>
  );
}
const StyledLogo = styled(MoodwaveLogo)`
  height: 45px;
  width: auto;
  fill: red;
`;

const StyledNavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px 10px 10px;
  background-color: var(--color-frame);
  border-top: 1px solid var(--color-frame);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.75rem;
  gap: 1.25rem;
  z-index: 2;
`;

const CenterWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const LogoCanvas = styled.div`
  color: var(--color-border);
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) =>
    props.$isActive
      ? "var(--color-home-icon-background-active)"
      : "var(--color-home-icon-background)"};
  color: ${(props) =>
    props.$isActive
      ? "var(--color-home-icon-foreground-active)"
      : "var(--color-home-icon-foreground)"};
  border-radius: 50%;
  border: 1px solid ${(props) => (props.$isActive ? "#313366" : "#E0E1F0")};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 3.125rem;
  transition: transform 0.3s ease;
  transform: scale(1);

  &:hover {
    transform: scale(1.1);
  }

  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: scale(1);
    }
  }

  img {
    margin-bottom: 2px;
    margin-left: 4px;
  }
  body.dark-theme & {
    background-color: ${(props) =>
      props.$isActive
        ? "var(--color-highlighted-background)"
        : "var(--color-frame)"};
    border: 1px solid
      ${(props) =>
        props.$isActive
          ? "var(--color-cards-foreground)"
          : "var(--color-cards-frame)"};
  }
`;

const StyledLink = styled(Link)`
  color: var(--color-secondary);
  font-size: 1rem;
  padding: 0.625rem;

  &:hover {
    color: #5b6c9f;
  }
`;

const HomeText = styled.span`
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 1.25rem;
  body.dark-theme & {
    color: ${(props) =>
      props.$isActive ? "var(--color-highlighted-foreground)" : "inherit"};
  }
`;
const BookmarkText = styled.span`
  font-size: 1rem;
  font-weight: normal;
  body.dark-theme & {
    color: ${(props) =>
      props.$isActive
        ? "var(--color-highlighted-foreground)"
        : "var(--color-foreground)"};
  }
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 7px;
  text-align: center;
  border-left: ${(props) => (props.$isActive ? "0.5px solid #313366" : "none")};
  border-right: ${(props) =>
    props.$isActive ? "0.5px solid #313366" : "none"};
  background-color: ${(props) =>
    props.$isActive ? "rgba(249, 249, 249, 1)" : "transparent"};

  body.dark-theme & {
    border-left: ${(props) =>
      props.$isActive ? `0.5px solid var(--color-cards-foreground)` : "none"};
    border-right: ${(props) =>
      props.$isActive ? `0.5px solid var(--color-cards-foreground)` : "none"};
  }
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  width: 18px;
  height: 28px;
  fill: "#313366";
  fill: ${(props) => (props.$isActive ? "#313366" : "#A0A0A0")};
  body.dark-theme & {
    fill: ${(props) => (props.$isActive ? "#00ff99" : "#9989")};
  }
`;
