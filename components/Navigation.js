import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import BookmarkIcon from "assets/bookmarkicons/Bookmark-filled.svg";
import MoodwaveLogo from "assets/navigationIcon/moodwave-logo.svg";
import CalendarIcon from "assets/calendarIcons/calendar-month.svg";
import StatisticIcon from "assets/statisticIcon/statistic-icon.svg";

export default function Navigation() {
  const { pathname } = useRouter();
  const isActive = (page) => pathname === page;

  return (
    <StyledNavigationWrapper>
      <StyledNavigationLeft>
        <StyledLink href="/bookmarks">
          <StyledIconWrapper $isActive={isActive("/bookmarks")}>
            <StyledBookmarkIcon
              $isActive={isActive("/bookmarks")}
              src="/Bookmark-filled.svg"
              alt="Bookmark Icon"
            />
            <StyledText $isActive={isActive("/bookmarks")}>
              Bookmarks
            </StyledText>
          </StyledIconWrapper>
        </StyledLink>
      </StyledNavigationLeft>
      <StyledNavigationCenter>
        <Link href="/">
          <StyledLogoCanvas $isActive={isActive("/")}>
            <StyledMoodwaveLogo $isActive={isActive("/")} />
            <StyledHomeText $isActive={isActive("/")}>Home</StyledHomeText>
          </StyledLogoCanvas>
        </Link>
      </StyledNavigationCenter>
      <StyledNavigationRight>
        <StyledLink href="/calendar">
          <StyledIconWrapper $isActive={isActive("/calendar")}>
            <StyledCalendarIcon src="/calendar-month.svg" alt="Calendar Icon" />
            <StyledText $isActive={isActive("/calendar")}>Calendar</StyledText>
          </StyledIconWrapper>
        </StyledLink>
        <StyledLink href="/statistic">
          <StyledIconWrapper $isActive={isActive("/statistic")}>
            <StyledStatisticIcon
              src="/statistic-icon.svg"
              alt="Statistic Icon"
            />
            <StyledText $isActive={isActive("/statistic")}>
              Statistic
            </StyledText>
          </StyledIconWrapper>
        </StyledLink>
      </StyledNavigationRight>
    </StyledNavigationWrapper>
  );
}

const StyledNavigationWrapper = styled.nav`
  font-family: "Baskerville", serif;
  display: flex;
  background-color: var(--color-frame);
  border-top: 1px solid var(--color-secondary);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.75rem;
`;

const StyledNavigationLeft = styled.div`
  font-family: "Baskerville", serif;
  bottom: 0;
  background-color: var(--color-frame);
  width: 100%;
  display: flex;
  align-items: center;
  height: 3.75rem;
  justify-content: flex-start;
`;

const StyledNavigationRight = styled.div`
  font-family: "Baskerville", serif;
  bottom: 0;
  background-color: var(--color-frame);
  display: flex;
  align-items: center;
  height: 3.75rem;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  color: var(--color-secondary);
`;

const StyledIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 7px 6px 7px 6px;
  text-align: center;
  border-left: ${(props) =>
    props.$isActive ? "0.5px solid var(--color-secondary)" : "none"};
  border-right: ${(props) =>
    props.$isActive ? "0.5px solid var(--color-secondary)" : "none"};
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

const StyledNavigationCenter = styled.div`
  position: absolute;
  left: 50%;
  top: -20px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  z-index: 2;
`;

const StyledLogoCanvas = styled.div`
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
      ? "var(--color-home-nav-background-active)"
      : "var(--color-highlighted-background)"};
  color: ${(props) =>
    props.$isActive
      ? "var(--color-home-icon-foreground-active)"
      : "var(--color-home-icon-foreground)"};
  border-radius: 50%;
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? "var(--color-secondary)"
        : "var(--color-home-icon-background-active)"};
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

const StyledMoodwaveLogo = styled(MoodwaveLogo)`
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

const StyledText = styled.span`
  font-size: 1rem;
  font-weight: normal;
  body.dark-theme & {
    color: ${(props) =>
      props.$isActive
        ? "var(--color-highlighted-foreground)"
        : "var(--color-highlighted-background)"};
  }
`;

const StyledHomeText = styled.span`
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

const StyledBookmarkIcon = styled(BookmarkIcon)`
  width: 18px;
  height: 22px;
  fill: "var(--color-secondary)";

  body.dark-theme & {
    fill: ${(props) =>
      props.$isActive
        ? "var(--color-highlighted-foreground)"
        : "var(--color-foreground)"};
  }
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 24px;
  height: 28px;
  fill: "var(--color-secondary)";
`;

const StyledStatisticIcon = styled(StatisticIcon)`
  width: 25px;
  height: 28px;

  body.dark-theme & {
    fill: "var(--color-secondary)";
  }
`;
