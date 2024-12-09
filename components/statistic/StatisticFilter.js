import styled from "styled-components";

export default function StatisticFilter({ selectedMonth, setSelectedMonth }) {
  return (
    <StyledContainer>
      <StyledLabel htmlFor="month">Month:</StyledLabel>
      <StyledMonthInput
        type="month"
        id="month"
        name="month"
        value={selectedMonth}
        onChange={(event) => setSelectedMonth(event.target.value)}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: var(--color-frame);
  padding: 16px;
`;

const StyledLabel = styled.label`
  color: var(--color-secondary);
  font-weight: bold;
`;

const StyledMonthInput = styled.input`
  padding: 0 0 6px 0;
  width: 100%;
  border: none;
  border-bottom: 1px dotted var(--color-form-foreground);
  background-color: transparent;
  color: var(--color-form-foreground);
  font-size: 1rem;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    color: var(--color-form-foreground);
  }
`;
