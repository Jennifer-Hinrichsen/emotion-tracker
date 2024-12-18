import styled from "styled-components";

export default function EmotionCardContent({
  emotion,
  emotionIcon,
  intensity,
  isDetailsPage,
  isDetailView,
}) {
  const notesText = emotion.notes?.props?.textToHighlight || "";

  const displayedNotes =
    !isDetailsPage && notesText.length > 50
      ? notesText.substring(0, 50) + "..."
      : notesText;

  return (
    <StyledEmotionCardContent>
      <StyledEmojiIcon
        $color={emotion.type.color}
        aria-label={`Emotion icon for ${emotion.type.name}`}
      >
        {emotionIcon}
      </StyledEmojiIcon>
      <StyledEmotionType
        $isDetailView={isDetailView}
        $hasImage={Boolean(emotion.imageUrl)}
        aria-label={`Emotion type: ${emotion.type.name}`}
      >
        {emotion.type.name}
      </StyledEmotionType>
      <StyledIntensityWrapper
        $isDetailView={isDetailView}
        $hasImage={Boolean(emotion.imageUrl)}
        aria-label={`Emotion intensity level: ${intensity}`}
      >
        {[1, 2, 3].map((value) => (
          <StyledIntensityBubble
            key={value}
            $size={value}
            $color={emotion.type.color}
            $isActive={intensity >= value}
            aria-label={`Intensity level ${value}`}
          />
        ))}
      </StyledIntensityWrapper>
      <StyledNotes
        aria-label={`Notes: ${displayedNotes || "No notes available"}`}
      >
        {displayedNotes}
      </StyledNotes>
    </StyledEmotionCardContent>
  );
}

const StyledEmotionCardContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 60px 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "emoji emotionType intensity"
    "emoji notes intensity";
  align-items: center;
  padding: 5px;
`;

const StyledEmojiIcon = styled.span`
  grid-area: emoji;
  align-self: start;
  justify-self: end;
  width: 50px;
  height: 50px;

  svg {
    color: ${(props) => props.$color || "var(--color-frame)"};
  }
`;

const StyledEmotionType = styled.p`
  grid-area: emotionType;
  margin: 0;
  margin-bottom: ${({ $isDetailView, $hasImage }) =>
    $isDetailView && !$hasImage ? "10px" : "0px"};
  padding-left: 28px;
  font-weight: 400;
  font-size: 1.2rem;
  color: var(--color-secondary);
`;

const StyledNotes = styled.p`
  grid-area: notes;
  padding-left: 28px;
  color: var(--color-secondary);
  font-size: 0.8rem;
  max-width: 100%;
`;

const StyledIntensityWrapper = styled.div`
  grid-area: intensity;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-self: end;
  position: absolute;
  top: ${(props) =>
    props.$isDetailView ? (props.$hasImage ? "-10px" : "12px") : "-20px"};
`;

const StyledIntensityBubble = styled.div`
  width: ${(props) => props.$size * 10}px;
  height: ${(props) => props.$size * 10}px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isActive
      ? props.$color || "var(--color-frame)"
      : `${props.$color || "var(--color-frame"}80`};
`;
