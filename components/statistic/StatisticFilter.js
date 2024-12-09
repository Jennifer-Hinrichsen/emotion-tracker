import styled from "styled-components";

export default function StatisticFilter({ selectedMonth, setSelectedMonth }) {
  return (
    <Styled>
      <StyledZwo>
        <StyledDrei>
          <label htmlFor="month">Month</label>
          <StyledDateAndTimeInput
            type="month"
            id="month"
            name="month"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
          />
        </StyledDrei>
        <StyledDrei></StyledDrei>
      </StyledZwo>
    </Styled>
  );
}

const Styled = styled.div`
  background-color: var(--color-slider-intensity);
  padding: 12px;
`;

const StyledZwo = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledDrei = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledDateAndTimeInput = styled.input`
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
