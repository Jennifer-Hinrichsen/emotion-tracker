import styled from "styled-components";
import Link from "next/link";
import BulbIcon from "assets/calendarIcons/bulb.svg";
import { useRouter } from "next/router";

export default function CalendarPopup({
  onClosePopup,
  emotionsForDay,
  formattedDate,
}) {
  const router = useRouter();

  const handleCreateEmotion = () => {
    router.push(`/?showForm=true&selectedDate=${formattedDate}`);
  };

  return (
    <StyledPopup>
      <StyledContentWrapper>
        <StyledCloseButton onClick={onClosePopup} aria-label="Close popup">
          ×
        </StyledCloseButton>
        <StyledDate>{formattedDate}</StyledDate>
        {emotionsForDay.length === 0 ? (
          <StyledNoEmotionsMessage aria-live="assertive">
            No emotions for this day
          </StyledNoEmotionsMessage>
        ) : (
          <StyledEmotionList>
            {emotionsForDay.map((emotion) => (
              <li key={emotion._id}>
                <StyledEmotionDot color={emotion.type.color} />
                <StyledLink href={`/emotion/${emotion._id}`}>
                  {emotion.type.name}
                </StyledLink>
              </li>
            ))}
          </StyledEmotionList>
        )}
        <StyledCreateButton
          onClick={handleCreateEmotion}
          aria-label="Create a new emotion"
        >
          <StyledBulbIcon />
          <StyledText>Create Emotion</StyledText>
        </StyledCreateButton>
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
  height: 90%;
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
  padding: 1rem;
  color: var(--color-background-cards);
  font-size: 1.2rem;
`;

const StyledNoEmotionsMessage = styled.p`
  color: var(--color-background-cards);
  font-size: 1rem;
  margin: 1rem;
  text-align: center;
`;

const StyledEmotionList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  padding: 1rem;
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

const StyledCreateButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-highlighted-foreground);
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  width: fit-content;
  cursor: pointer;
`;

const StyledBulbIcon = styled(BulbIcon)`
  margin-top: 0.25rem;
  color: var(--color-highlighted-foreground);
`;

const StyledText = styled.p`
  margin: 0;
  padding-bottom: 0.25rem;
  color: var(--color-highlighted-foreground);
`;

const StyledLink = styled(Link)`
  color: var(--color-background-cards);
  cursor: pointer;
  font-size: 1rem;
`;
