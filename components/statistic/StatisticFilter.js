import styled from "styled-components";

export default function StatisticFilter() {
  return (
    <Styled>
      {/* <StyledP>Filter period of time</StyledP> */}
      <StyledZwo>
        <StyledDrei>
          <label htmlFor="month">Month</label>
          <StyledDateAndTimeInput
            type="month"
            id="month"
            name="month"
          ></StyledDateAndTimeInput>
        </StyledDrei>
        <StyledDrei>
          <label htmlFor="calendarWeek">Calendarweek</label>
          <StyledDateAndTimeInput
            type="datetime"
            id="calendarWeek"
            name="calendarWeek"
            // type="text"
            // id="calendarWeek"
            // name="calendarWeek"
            // pattern="\d{4}-W\d{2}"
            // placeholder="YYYY-WW"
            // title="Format: YYYY-WW (e.g., 2024-W12)"
          ></StyledDateAndTimeInput>
        </StyledDrei>
      </StyledZwo>
    </Styled>
  );
}

const Styled = styled.div`
  background-color: var(--color-slider-intensity);
  padding: 12px;
`;

// const StyledP = styled.div`
//   padding: 5px 0 20px 0;
//   font-weight: bold;
//   font-size: 1.2em;
// `;

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
