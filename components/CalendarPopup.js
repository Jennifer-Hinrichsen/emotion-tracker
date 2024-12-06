import styled from "styled-components";
import Link from "next/link";

export default function CalendarPopup({
  getEmotionsForDay,
  selectedDay,
  onClosePopup,
}) {
  const formattedDate = selectedDay.date.toLocaleDateString();

  return (
    <StyledPopup>
      <StyledContentWrapper>
        <StyledCloseButton onClick={onClosePopup}>×</StyledCloseButton>
        <StyledDate>{formattedDate}</StyledDate>
        <StyledEmotionList>
          {getEmotionsForDay(selectedDay.date).map((emotion) => (
            <li key={emotion._id}>
              <StyledEmotionDot color={emotion.type.color} />
              <StyledLink href={`/emotion/${emotion._id}`}>
                {emotion.type.name}
              </StyledLink>
            </li>
          ))}
        </StyledEmotionList>
      </StyledContentWrapper>
    </StyledPopup>
  );
}

const StyledPopup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 40%;
  overflow: hidden;
  border-radius: 8px;
  background-color: var(--color-secondary);
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-background-cards);
  cursor: pointer;
`;

const StyledDate = styled.p`
  margin: 0;
  padding-bottom: 1.5rem;
  color: var(--color-background-cards);
  font-size: 1.2rem;
`;

const StyledEmotionList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 0;
  overflow-y: auto;
`;

const StyledEmotionDot = styled.span`
  background-color: ${(props) => props.color};
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const StyledLink = styled(Link)`
  color: var(--color-background-cards);
  cursor: pointer;
  font-size: 1rem;
`;
