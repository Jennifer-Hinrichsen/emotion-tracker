import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import BookmarkIcon from "@/assets/bookmarkicons/Bookmark-filled.svg";
import MoodwaveLogo from "@/assets/MoodwaveLogo.svg";

export default function Navigation() {
  const { pathname } = useRouter();
  const isActive = (page) => pathname === page;

  console.log(MoodwaveLogo());
  return (
    <StyledNavigationBar>
      <StyledLink href="/bookmarks">
        <IconWrapper $isActive={isActive("/bookmarks")}>
          <StyledBookmarkIcon
            $isActive={isActive("/bookmarks")}
            src="/Bookmark-filled.svg"
            alt="Bookmark Icon"
          />
          My Emotions
        </IconWrapper>
      </StyledLink>
      <CenterWrapper>
        <Link href="/">
          <LogoCanvas $isActive={isActive("/")}>
            <MoodwaveLogo />
            <HomeText>Home</HomeText>
          </LogoCanvas>
        </Link>
      </CenterWrapper>
    </StyledNavigationBar>
  );
}

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
  gap: 4px;
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
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
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
`;
const StyledBookmarkIcon = styled(BookmarkIcon)`
  width: 18px;
  height: 28px;
  fill: "#313366";
  fill: ${(props) =>
    props.$isActive
      ? "#313366"
      : "#A0A0A0"}; // Setzt das Icon auf grau, wenn nicht aktiv
`;
