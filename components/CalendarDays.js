import styled from "styled-components";
import MultipleIcon from "assets/calendarIcons/circles.svg";

export default function CalendarDays({ day, onDayClick, getEmotionsForDay }) {
  const firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  const currentDate = new Date(firstDayOfMonth);

  for (let i = 0; i < 42; i++) {
    if (i === 0 && weekdayOfFirstDay === 0) {
      currentDate.setDate(currentDate.getDate() - 7);
    } else if (i === 0) {
      currentDate.setDate(currentDate.getDate() + (i - weekdayOfFirstDay));
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    let calendarDay = {
      $currentMonth: currentDate.getMonth() === day.getMonth(),
      date: new Date(currentDate),
      month: currentDate.getMonth(),
      number: currentDate.getDate(),
      $selected: currentDate.toDateString() === day.toDateString(),
      year: currentDate.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  const daysWithEmotions = currentDays.map((calendarDay) => {
    const emotionsForDay = getEmotionsForDay(calendarDay.date);
    return { ...calendarDay, emotionsForDay };
  });

  return (
    <StyledTableContent>
      {daysWithEmotions.map((calendarDay) => (
        <StyledCalendarDay
          key={calendarDay.date.toISOString()}
          $currentMonth={calendarDay.$currentMonth}
          onClick={() =>
            onDayClick({
              date: calendarDay.date,
              emotions: calendarDay.emotionsForDay,
            })
          }
        >
          <StyledDayContent>
            <p>{calendarDay.number}</p>
            {getEmotionsForDay(calendarDay.date).length > 2 ? (
              <StyledMultipleIcon src="/circles.svg" alt="Multiple Icon" />
            ) : (
              getEmotionsForDay(calendarDay.date).map((emotion) => (
                <StyledEmotionDot
                  key={emotion._id}
                  color={emotion.type.color}
                />
              ))
            )}
          </StyledDayContent>
        </StyledCalendarDay>
      ))}
    </StyledTableContent>
  );
}

const StyledTableContent = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.1rem;
  width: 100%;
  height: 100%;
`;

const StyledCalendarDay = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.4;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-primary);
  }

  p {
    color: var(--color-border);
    font-size: 1rem;
  }
`;

const StyledDayContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  cursor: pointer;
`;

const StyledMultipleIcon = styled(MultipleIcon)`
  width: 20px;
  height: 24px;
  color: #313366;
`;

const StyledEmotionDot = styled.div`
  gap: 0.2rem;
  width: 0.6rem;
  height: 0.6rem;
  background-color: ${(props) => props.color || "var(--color-background)"};
  border-radius: 50%;
`;
