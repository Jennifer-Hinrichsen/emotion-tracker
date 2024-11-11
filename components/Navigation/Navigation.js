import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import BookmarkIcon from "assets/bookmarkicons/BookmarkPinIcon.svg";

export default function Navigation() {
  const router = useRouter();
  const isOnBookmarksPage = router.pathname === "/bookmarks";

  return (
    <StyledNavigationBar>
      <LinkStyled href="/bookmarks">
        <IconWrapper isActive={isOnBookmarksPage}>
          <StyledBookmarkIcon
            src="/BookmarkPinIcon.svg"
            alt="Bookmark Icon"
            width={24}
            height={24}
          />
          My Emotions
        </IconWrapper>
      </LinkStyled>
      <CenterWrapper>
        <Link href="/" passHref>
          <LogoCanvas isOnBookmarksPage={isOnBookmarksPage}>
            <Image src="/moodwave-logo.svg" alt="Logo" width={45} height={45} />
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
  padding: 10px;
  background-color: #e0e1f0;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3.75rem;
  gap: 1.25rem;
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
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) =>
    props.isOnBookmarksPage ? "#E0E1F0" : "#fff"};
  border-radius: 50%;
  border: 1px solid
    ${(props) => (props.isOnBookmarksPage ? "#E0E1F0" : "#313366")};
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

const LinkStyled = styled.a`
  color: #313366;
  font-size: 1rem;
  padding: 0.625rem;

  &:hover {
    color: #5b6c9f;
  }
`;

const HomeText = styled.span`
  font-size: 1rem;
  font-weight: normal;
  color: #313366;
  margin-bottom: 1.25rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 7px;
  text-align: center;
  border-left: ${(props) => (props.isActive ? "0.5px solid #313366" : "none")};
  border-right: ${(props) => (props.isActive ? "0.5px solid #313366" : "none")};
  background-color: ${(props) =>
    props.isActive ? "rgba(249, 249, 249, 1)" : "transparent"};
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  width: 24px;
  height: 24px;
  fill: "#313366";
`;
