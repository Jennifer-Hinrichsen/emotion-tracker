import styled from "styled-components";
import { emotionsIcons } from "./EmotionIcons";

export default function EmotionCardContent({ emotion, emotionTypes }) {
  const matchedEmotionIcon = (() => {
    // Hole die zugehörige emotionIcon-ID aus emotionTypes
    const customEmotion = emotionTypes.find(
      (item) => item.emotionType === emotion.emotionType
    );
    if (customEmotion?.emotionIcon) {
      // Finde das passende Icon in emotionsIcons basierend auf der ID
      return emotionsIcons.find(
        (icon) => icon.id === customEmotion.emotionIcon
      );
    }
    // Fallback: Nutze emotionType als Schlüssel, falls keine emotionIcon-ID definiert ist
    return emotionsIcons.find(
      (icon) => icon.emotionType === emotion.emotionType
    );
  })();

  const matchedEmotionColor = emotionTypes.find(
    (color) => color.emotionType === emotion.emotionType
  );

  return (
    <StyledEmotionCardContent>
      <StyledEmojiIcon $color={matchedEmotionColor?.color}>
        {matchedEmotionIcon?.emotionIcon}
      </StyledEmojiIcon>
      <StyledEmotionType>{emotion.emotionType}</StyledEmotionType>
      <StyledIntensity>{emotion.intensity}</StyledIntensity>
      <StyledNotes>{emotion.notes}</StyledNotes>
    </StyledEmotionCardContent>
  );
}

const StyledEmotionCardContent = styled.div`
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
  width: 50px;
  height: 50px;

  svg {
    color: ${(props) => props.$color || "var(--color-frame)"};
  }
`;

const StyledEmotionType = styled.p`
  grid-area: emotionType;
  margin: 0;
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

const StyledIntensity = styled.p`
  grid-area: intensity;
  align-self: start;
  margin: 6px 12px;
  text-align: right;
  font-weight: 400;
  font-size: 1.2rem;
  color: var(--color-secondary);
`;
