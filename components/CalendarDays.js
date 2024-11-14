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
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  width: 100%;
  height: 100%;
`;

const StyledCalendarDay = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.6;
  border: 1px solid #a6a6a6;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  p {
    color: #a6a6a6;
    font-size: 1rem;
  }

  &.current p {
    color: #000000;
  }

  &.selected p {
    color: #cc0000;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.875rem;
    }
  }

  @media (max-width: 576px) {
    p {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 400px) {
    p {
      font-size: 0.625rem;
    }
  }
`;
