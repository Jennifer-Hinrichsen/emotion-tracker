import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import BookmarkIcon from "assets/bookmarkicons/Bookmark-filled.svg";
import CalendarIcon from "assets/calendarIcons/calendar-month.svg";

export default function Navigation() {
  const { pathname } = useRouter();
  const $isActive = (page) => pathname === page;

  return (
    <StyledNavigationBar>
      <StyledLink href="/bookmarks">
        <IconWrapper $isActive={$isActive("/bookmarks")}>
          <StyledBookmarkIcon src="/Bookmark-filled.svg" alt="Bookmark Icon" />
          My Emotions
        </IconWrapper>
      </StyledLink>
      <CenterWrapper>
        <Link href="/">
          <LogoCanvas $isOnHomePage={$isActive("/")}>
            <Image src="/moodwave-logo.svg" alt="Logo" width={45} height={45} />
            <HomeText>Home</HomeText>
          </LogoCanvas>
        </Link>
      </CenterWrapper>
      <StyledLink href="/calendar">
        <IconWrapper $isActive={$isActive("/calendar")}>
          <StyledCalendarIcon src="/calendar-month.svg" alt="Calendar Icon" />
          My Calendar
        </IconWrapper>
      </StyledLink>
    </StyledNavigationBar>
  );
}

const StyledNavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--color-frame);
  border-top: 1px solid var(--color-border);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.75rem;
  gap: 1.25rem;
  border-top: 1px solid var(--color-frame);
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
  color: var(--color-secondary);
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => (props.$isOnHomePage ? "#fff" : "#E0E1F0")};
  border-radius: 50%;
  border: 1px solid ${(props) => (props.$isOnHomePage ? "#313366" : "#E0E1F0")};
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
  color: var(--color-secondary);
  margin-bottom: 1.25rem;
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
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 24px;
  height: 28px;
  fill: "#313366";
`;
