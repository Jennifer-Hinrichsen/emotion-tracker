import styled from "styled-components";
import BookmarkButton from "./BookmarkButton";
import Link from "next/link";
import EmotionCardContent from "./EmotionCardContent";
import formatDate from "./TransformDateTime";
<<<<<<< HEAD
import { allEmotionIcons } from "@/lib/allEmotionOptions";
=======
import Highlighter from "react-highlight-words";
import { emotionList } from "@/lib/emotionList";
>>>>>>> main

export default function EmotionCard({
  emotion,
  onToggleBookmark,
  isBookmarked,
  isDetailsPage = false,
<<<<<<< HEAD
  customEmotionTypes,
=======
  intensity,
  searchTerm,
>>>>>>> main
}) {
  const { date, time } = formatDate(emotion.dateTime);

  const emotionTypeData = customEmotionTypes.find(
    (customEmotionType) => customEmotionType.emotionType === emotion.emotionType
  );

  const emotionIcon = allEmotionIcons.find(
    (emotionIcon) => emotionIcon.emotionIconId === emotionTypeData.emotionIconId
  )?.emotionIcon;

  return (
    <StyledCardWrapper>
      {isDetailsPage ? (
        <StyledOuterBox color={emotionTypeData.color}>
          <StyledTopBox color={emotionTypeData.color}>
            <StyledDate>{date}</StyledDate>
            <StyledTime>{time}</StyledTime>
          </StyledTopBox>
          <StyledEmotionCard>
            <EmotionCardContent
<<<<<<< HEAD
              emotion={emotion}
              emotionColor={emotionTypeData.color}
              emotionIcon={emotionIcon}
=======
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
>>>>>>> main
            />
            <BookmarkButton
              isBookmarked={isBookmarked}
              onToggleBookmark={() => onToggleBookmark(emotion.id)}
            />
          </StyledEmotionCard>
        </StyledOuterBox>
      ) : (
        <>
          <StyledLink key={emotion.id} href={`emotion/${emotion.id}`}>
            <StyledOuterBox color={emotionTypeData.color}>
              <StyledTopBox color={emotionTypeData.color}>
                <StyledDate>{date}</StyledDate>
                <StyledTime>{time}</StyledTime>
              </StyledTopBox>
              <StyledEmotionCard>
                <EmotionCardContent
<<<<<<< HEAD
                  emotion={emotion}
                  emotionColor={emotionTypeData.color}
                  emotionIcon={emotionIcon}
=======
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
>>>>>>> main
                />
              </StyledEmotionCard>
            </StyledOuterBox>
          </StyledLink>
          <BookmarkButton
            isBookmarked={isBookmarked}
            onToggleBookmark={() => onToggleBookmark(emotion.id)}
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
  margin: 24px 8px;
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
  color: var(--color-secondary);
`;

const StyledTime = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-secondary);
`;

const StyledEmotionCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 1rem;
  margin: 16px 8px;
  padding: 10px;
  background-color: var(--color-background);
  border-radius: 8px;
  word-break: break-word;
`;
const StyledHighlighter = styled(Highlighter)`
  background-color: yellow;
`;
