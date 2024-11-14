import styled from "styled-components";

export default function CalendarDays({ day, changeCurrentDay }) {
  const firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let i = 0; i < 42; i++) {
    if (i === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (i === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (i - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      $currentMonth: firstDayOfMonth.getMonth() === day.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  return (
    <StyledTableContent>
      {currentDays.map((calendarDay, index) => (
        <StyledCalendarDay
          key={index}
          $currentMonth={calendarDay.$currentMonth}
          selected={calendarDay.selected}
          onClick={() => changeCurrentDay(calendarDay)}
        >
          <p>{calendarDay.number}</p>
        </StyledCalendarDay>
      ))}
    </StyledTableContent>
  );
}

const StyledTableContent = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
`;

const StyledCalendarDay = styled.div`
  width: 125px;
  height: 75px;
  position: relative;
  border: 1px solid #a6a6a6;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  p {
    position: absolute;
    right: 10px;
    color: #a6a6a6;
  }

  &.current p {
    color: #000000;
  }

  &.selected p {
    color: #cc0000;
    font-weight: bold;
  }
`;
