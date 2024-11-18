import styled from "styled-components";
import { emotionList } from "@/lib/emotionList";

export default function CalendarDays({
  day,
  emotions,
  onDayClick,
  getEmotionsForDay,
}) {
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

  const getColorByEmotionType = (type) => {
    const $emotion = emotionList.find(
      (emotion) => emotion.emotionType === type
    );
    return $emotion ? $emotion.color : "var(--color-background)";
  };

  return (
    <StyledTableContent>
      {currentDays.map((calendarDay, index) => (
        <StyledCalendarDay
          key={index}
          $currentMonth={calendarDay.$currentMonth}
          onClick={() =>
            onDayClick({
              date: calendarDay.date,
              emotions: getEmotionsForDay(calendarDay.date),
            })
          }
        >
          <StyledDayContent>
            <p>{calendarDay.number}</p>
            {getEmotionsForDay(calendarDay.date).length > 2 ? (
              <StyledEmotionDot color="var(--color-various)" />
            ) : (
              getEmotionsForDay(calendarDay.date).map(($emotion) => (
                <StyledEmotionDot
                  key={$emotion.id}
                  color={getColorByEmotionType($emotion.emotionType)}
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
`;

const StyledEmotionDot = styled.div`
  gap: 0.2rem;
  width: 0.6rem;
  height: 0.6rem;
  background-color: ${(props) => props.color || "var(--color-background)"};
  border-radius: 50%;
`;
