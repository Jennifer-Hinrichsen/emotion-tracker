import styled from "styled-components";
import formatDate from "./TransformDateTime";

export default function JournalCard({ journalEntry, onDelete }) {
  const { date, time } = formatDate(journalEntry.date);
  const { subject, text } = journalEntry;

  return (
    <StyledCardWrapper>
      <StyledOuterBox>
        <StyledTopBox>
          <StyledDate>
            {date} {time}
          </StyledDate>
          <DeleteButton onClick={onDelete}>✕</DeleteButton>
        </StyledTopBox>
        <StyledJournalCard>
          <StyledTitle>{subject}</StyledTitle>
          <StyledText>{text}</StyledText>
        </StyledJournalCard>
      </StyledOuterBox>
    </StyledCardWrapper>
  );
}

const StyledCardWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const StyledOuterBox = styled.div`
  background-color: var(--color-background);
  border: 1px solid ${({ color }) => color || "var(--color-border)"};
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px var(--color-shadow);
  margin: 24px 0;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
`;

const StyledTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-highlighted-background);
  padding: 5px;
`;

const StyledDate = styled.p`
  margin: 0;
  padding-left: 1rem;
  font-size: 0.8rem;
  color: var(--color-cards-foreground);
`;

const StyledJournalCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 12px 8px;
  background-color: var(--color-background-cards);
  word-break: break-word;
  width: 100%;
`;

const StyledText = styled.p`
  margin-top: 0;
  text-align: center;
  color: var(--color-form-foreground);
  line-height: 1.4;

  body.dark-theme & {
    color: var(--color-foreground);
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-highlighted-foreground);
  font-size: 1rem;
  cursor: pointer;
  padding: 0 10px;

  &:hover {
    color: var(--color-form-foreground);

    body.dark-theme & {
      color: var(--color-highlighted-foreground);
    }
  }
`;
const StyledTitle = styled.h2`
  margin-top: -4px;
  color: var(--color-form-foreground);
  font-family: "Baskerville", serif;
  font-weight: normal;
  body.dark-theme & {
    color: var(--color-foreground);
  }
`;
