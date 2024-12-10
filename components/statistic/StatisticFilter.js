import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "assets/calendarIcons/calendar-month.svg";

export default function StatisticFilter({
  onCustomDateChange,
  onClearCustomDate,
  customDateRange,
  onToggleCalendar,
  isCustomDatePickerOpen,
}) {
  const customDateLabel =
    customDateRange.start && customDateRange.end
      ? `${customDateRange.start.toLocaleDateString()} - ${customDateRange.end.toLocaleDateString()}`
      : "Customize your Date Range";

  const isDateSelected = customDateRange.start && customDateRange.end;

  return (
    <StyledContainer>
      <StyledCustomContainer>
        <StyledCalendarButton onClick={onToggleCalendar}>
          <StyledCalendarIcon src="/calendar-month.svg" alt="Calendar Icon" />
        </StyledCalendarButton>
        <StyledDateInput
          type="text"
          value={customDateLabel}
          onClick={onToggleCalendar}
          readOnly
        />
        {(isDateSelected || isCustomDatePickerOpen) && (
          <StyledClearButton
            onClick={onClearCustomDate}
            aria-label="Clear custom date range"
          >
            x
          </StyledClearButton>
        )}
      </StyledCustomContainer>
      {isCustomDatePickerOpen && (
        <StyledDatePickerContainer>
          <DatePicker
            selected={customDateRange.start}
            onChange={onCustomDateChange}
            startDate={customDateRange.start}
            endDate={customDateRange.end}
            selectsRange
            inline
          />
        </StyledDatePickerContainer>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: var(--color-frame);
  padding: 15px;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const StyledCustomContainer = styled.div`
  position: relative;
  display: flex;
`;

const StyledCalendarButton = styled.button`
  background-color: var(--color-frame);
  border: none;
  cursor: pointer;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  width: 30px;
  height: 26px;
  color: var(--color-secondary);
`;

const StyledDateInput = styled.input`
  width: 80%;
  border: none;
  background-color: var(--color-form);
  color: var(--color-form-foreground);
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const StyledClearButton = styled.button`
  position: absolute;
  right: -4px;
  top: -2px;
  border-radius: 50px;
  width: 25px;
  height: 25px;
  border: solid 1px var(--color-secondary);
  background-color: var(--color-background);
  color: var(--color-secondary);

  body.dark-theme & {
    background-color: var(--color-frame);
  }
`;

const StyledDatePickerContainer = styled.div`
  position: absolute;
  margin-top: -46px;
  margin-left: 34px;
`;
