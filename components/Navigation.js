import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import BookmarkIcon from "assets/bookmarkicons/Bookmark-filled.svg";
import MoodwaveLogo from "assets/moodwave-logo.svg";

export default function Navigation() {
  const { pathname } = useRouter();
  const isActive = (page) => pathname === page;

  return (
    <StyledNavigationBar>
      <StyledLink href="/bookmarks">
        <IconWrapper $isActive={isActive("/bookmarks")}>
          <StyledBookmarkIcon
            $isActive={isActive("/bookmarks")}
            src="/Bookmark-filled.svg"
            alt="Bookmark Icon"
          />
          <BookmarkText $isActive={isActive("/bookmarks")}>
            My Emotions
          </BookmarkText>
        </IconWrapper>
      </StyledLink>
      <CenterWrapper>
        <Link href="/">
          <LogoCanvas $isActive={isActive("/")}>
            <StyledLogo $isActive={isActive("/")} />
            <HomeText $isActive={isActive("/")}>Home</HomeText>
          </LogoCanvas>
        </Link>
      </CenterWrapper>
    </StyledNavigationBar>
  );
}
const StyledLogo = styled(MoodwaveLogo)`
  width: 43px;
  height: auto;
  padding-top: 2px;
  color: var(--color-secondary);
  body.dark-theme & {
    color: ${(props) =>
      props.$isActive
        ? "var(--color-highlighted-foreground)"
        : "var(--color-foreground)"};
  }
`;

const StyledNavigationBar = styled.nav`
  font-family: "Baskerville", serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px 10px 10px;
  background-color: var(--color-frame);
  border-top: 1px solid var(--color-secondary);
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
  top: -20px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const LogoCanvas = styled.div`
  color: var(--color-border);
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  background-color: ${(props) =>
    props.$isActive
      ? "var(--color-home-icon-background-active)"
      : "var(--color-highlighted-background)"};
  color: ${(props) =>
    props.$isActive
      ? "var(--color-home-icon-foreground-active)"
      : "var(--color-home-icon-foreground)"};
  border-radius: 50%;
  border: 1px solid ${(props) => (props.$isActive ? "#313366" : "#E0E1F0")};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
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
  color: var(--color-secondary);
  body.dark-theme & {
    color: ${(props) =>
      props.$isActive
        ? "var(--color-highlighted-foreground)"
        : "var(--color-foreground)"};
  }
`;
const BookmarkText = styled.span`
  font-size: 1rem;
  font-weight: normal;
  body.dark-theme & {
    color: ${(props) =>
      props.$isActive
        ? "var(--color-highlighted-foreground)"
        : "var(--color-highlighted-background)"};
  }
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 7px;
  text-align: center;
  border-left: ${(props) => (props.$isActive ? "0.5px solid #313366" : "none")};
  border-right: ${(props) =>
    props.$isActive ? "0.5px solid #313366" : "none"};
  background-color: ${(props) =>
    props.$isActive
      ? "var(--color-home-nav-background-active)"
      : "transparent"};

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
  fill: #313366;

  body.dark-theme & {
    fill: ${(props) =>
      props.$isActive
        ? "var(--color-highlighted-foreground)"
        : "var(--color-foreground)"};
  }
`;
