import styled from "styled-components";
import Link from "next/link";

export default function CalendarPopup({
  getEmotionsForDay,
  selectedDay,
  setPopupVisible,
  getColorByEmotionType,
}) {
  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <StyledPopup>
      <StyledPopupContent>
        <StyledSubheadline>Emotions</StyledSubheadline>
        <StyledEmotionList>
          {getEmotionsForDay(selectedDay.date).map(($emotion) => (
            <li key={$emotion.id}>
              <StyledEmotionDot
                color={getColorByEmotionType($emotion.emotionType)}
              />
              <StyledLink href={`/emotion/${$emotion.id}`}>
                {$emotion.emotionType}
              </StyledLink>
            </li>
          ))}
        </StyledEmotionList>
        <StyledCloseButton onClick={closePopup}>Close</StyledCloseButton>
      </StyledPopupContent>
    </StyledPopup>
  );
}

const StyledSubheadline = styled.h2`
  margin: 0;
  padding: 10px 0;
  color: var(--color-secondary);
  text-align: center;
`;

const StyledPopup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 40%;
  background-color: #e0e1f0;
`;

const StyledPopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background-light);
  padding: 1rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const StyledEmotionDot = styled.span`
  background-color: ${(props) => props.color};
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const StyledEmotionList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 0;
`;

const StyledLink = styled(Link)`
  color: var(--color-secondary);
  cursor: pointer;
  font-size: 1rem;
`;

const StyledCloseButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #7f8c8d;
  }
`;
