import EmotionList from "@/components/EmotionList";
import styled from "styled-components";

export default function HomePage() {
  return (
    <div>
      <StyledHeadline>Emotion Tracker</StyledHeadline>
      <EmotionList />
    </div>
  );
}

const StyledHeadline = styled.h1`
  text-align: center;
`;
