import styled from "styled-components";
import BookmarkButton from "./BookmarkButton";
import OptionsButton from "./OptionsButton";
import Link from "next/link";
import EmotionCardContent from "./EmotionCardContent";
import formatDate from "./TransformDateTime";
import { allEmotionIcons } from "@/lib/allEmotionOptions";
import Highlighter from "react-highlight-words";
import OpenaiFeedback from "./OpenaiFeedback";
import ImageUpload from "./ImageUpload";

export default function EmotionCard({
  emotion,
  onToggleBookmark,
  isBookmarked,
  isDetailsPage,
  intensity,
  searchTerm,
  onDeleteEmotion,
  isMenuOpen,
  onToggleMenu,
}) {
  const { date, time } = formatDate(emotion.dateTime);

  const emotionIcon = allEmotionIcons.find(
    (emotionIcon) => emotionIcon.emotionIconId === emotion.type.emotionIconId
  )?.emotionIcon;

  return (
    <StyledCardWrapper
      aria-label={`Emotion card for ${emotion.type.name} on ${date}`}
    >
      {isDetailsPage ? (
        <StyledOuterBox color={emotion.type.color}>
          <StyledTopBox color={emotion.type.color}>
            <StyledDate>{date}</StyledDate>
            <StyledTime>{time}</StyledTime>
          </StyledTopBox>
          <StyledEmotionCard>
            <ImageUpload emotion={emotion} />
            <EmotionCardContent
              isDetailView={true}
              emotionColor={emotion.type.color}
              emotionIcon={emotionIcon}
              emotion={{
                ...emotion,
                notes: (
                  <Highlighter
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={emotion.notes}
                  />
                ),
              }}
              intensity={intensity}
              isDetailsPage={isDetailsPage}
            />
            <OpenaiFeedback emotion={emotion} />
            <BookmarkButton
              isBookmarked={isBookmarked}
              onToggleBookmark={() => onToggleBookmark(emotion._id)}
              aria-label={
                isBookmarked
                  ? `Remove bookmark for ${emotion.type.name}`
                  : `Add bookmark for ${emotion.type.name}`
              }
            />
          </StyledEmotionCard>
        </StyledOuterBox>
      ) : (
        <>
          <StyledLink
            key={emotion._id}
            href={`emotion/${emotion._id}`}
            aria-label={`View details for emotion on ${date}`}
          >
            <StyledOuterBox color={emotion.type.color}>
              <StyledTopBox color={emotion.type.color}>
                <StyledDate>{date}</StyledDate>
                <StyledTime>{time}</StyledTime>
              </StyledTopBox>
              <StyledEmotionCard>
                <EmotionCardContent
                  emotionIcon={emotionIcon}
                  emotion={{
                    ...emotion,
                    notes: (
                      <Highlighter
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        textToHighlight={emotion.notes}
                      />
                    ),
                  }}
                  intensity={intensity}
                />
              </StyledEmotionCard>
            </StyledOuterBox>
          </StyledLink>
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggleBookmark={() => onToggleBookmark(emotion._id)}
            aria-label={
              isBookmarked
                ? `Remove bookmark for ${emotion.type.name}`
                : `Add bookmark for ${emotion.type.name}`
            }
          />

          <OptionsButton
            onDeleteEmotion={() => onDeleteEmotion(emotion._id)}
            emotion={emotion}
            aria-label={`Delete emotion on ${date}`}
            isMenuOpen={isMenuOpen}
            onToggleMenu={onToggleMenu}
          />
        </>
      )}
    </StyledCardWrapper>
  );
}

const StyledCardWrapper = styled.div`
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:visited {
    color: inherit;
  }
`;

const StyledOuterBox = styled.div`
  background-color: var(--color-background);
  border: 1px solid ${({ color }) => color || "var(--color-border)"};
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px var(--color-shadow);
  margin: 0px 8px 24px;
  overflow: hidden;
`;

const StyledTopBox = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: ${({ color }) => color || "var(--color-background)"};
  padding: 5px;
`;

const StyledDate = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-cards-foreground);
`;

const StyledTime = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-cards-foreground);
`;

const StyledEmotionCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 1rem;
  padding: 26px 8px;
  background-color: var(--color-background-cards);
  word-break: break-word;
`;
