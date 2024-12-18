import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import BookmarkIcon from "assets/bookmarkicons/Bookmark-filled.svg";
import MoodwaveLogo from "assets/navigationIcon/moodwave-logo.svg";
import CalendarIcon from "assets/calendarIcons/calendar-month.svg";
import StatisticIcon from "assets/statisticIcon/statistic-icon.svg";
import JournalIcon from "assets/journalIcons/journal-icon.svg";

export default function Navigation() {
  const { pathname } = useRouter();
  const isActive = (page) => pathname === page;

  return (
    <StyledNavigationWrapper>
      <StyledNavigationLeft>
        <StyledLink href="/bookmarks">
          <StyledIconWrapper $isActive={isActive("/bookmarks")} $isLeft={true}>
            <StyledBookmarkIcon aria-label="Bookmark Icon" />
            <StyledText>Bookmark</StyledText>
          </StyledIconWrapper>
        </StyledLink>
        <StyledLink href="/journal">
          <StyledIconWrapper $isActive={isActive("/journal")}>
            <StyledJournalIcon aria-label="Journal Icon" />
            <StyledText>Journal</StyledText>
          </StyledIconWrapper>
        </StyledLink>
      </StyledNavigationLeft>
      <StyledNavigationCenter>
        <Link href="/">
          <StyledLogoCanvas $isActive={isActive("/")}>
            <StyledMoodwaveLogo />
            <StyledHomeText>Home</StyledHomeText>
          </StyledLogoCanvas>
        </Link>
      </StyledNavigationCenter>
      <StyledNavigationRight>
        <StyledLink href="/calendar">
          <StyledIconWrapper $isActive={isActive("/calendar")}>
            <StyledCalendarIcon aria-label="Calendar Icon" />
            <StyledText>Calendar</StyledText>
          </StyledIconWrapper>
        </StyledLink>
        <StyledLink href="/statistic">
          <StyledIconWrapper $isActive={isActive("/statistic")}>
            <StyledStatisticIcon aria-label="Statistic Icon" />
            <StyledText>Statistic</StyledText>
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
  padding: ${(props) =>
    props.$isLeft ? "12px 6px 7px 6px" : "7px 6px 7px 6px"};
  text-align: center;

  border-inline: none;
  background-color: transparent;
  body.dark-theme & {
    border-inline: none;
    color: var(--color-foreground);
  }

  ${(props) =>
    props.$isActive &&
    css`
      border-inline: 0.5px solid var(--color-secondary);
      background-color: var(--color-home-nav-background-active);
      body.dark-theme & {
        border-inline: 0.5px solid var(--color-cards-foreground);
        color: var(--color-highlighted-foreground);
      }
    `}
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
  width: 97px;
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

    color: ${(props) =>
      props.$isActive
        ? "var(--color-highlighted-foreground)"
        : "var(--color-foreground)"};
  }
`;

const StyledMoodwaveLogo = styled(MoodwaveLogo)`
  width: 43px;
  height: auto;
  padding-top: 2px;
`;

const StyledText = styled.span`
  font-size: 1rem;
  font-weight: normal;
`;

const StyledHomeText = styled.span`
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 1.25rem;
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  width: 18px;
  height: 22px;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 24px;
  height: 28px;
`;

const StyledStatisticIcon = styled(StatisticIcon)`
  width: 25px;
  height: 28px;
`;
const StyledJournalIcon = styled(JournalIcon)`
  width: 25px;
  height: 28px;
`;
