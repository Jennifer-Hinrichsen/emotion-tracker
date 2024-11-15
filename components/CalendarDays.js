import styled from "styled-components";
import { emotionList } from "@/lib/emotionList";

export default function CalendarDays({ day, changeCurrentDay, emotions }) {
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

  const getEmotionsForDay = (date) => {
    return emotions.filter(($emotion) => {
      const emotionDate = new Date($emotion.dateTime);
      return emotionDate.toDateString() === date.toDateString();
    });
  };

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
          $selected={calendarDay.$selected}
          onClick={() => changeCurrentDay(calendarDay)}
        >
          <p>{calendarDay.number}</p>
          {getEmotionsForDay(calendarDay.date).map(($emotion) => (
            <StyledEmotionTag
              key={$emotion.id}
              $emotion={$emotion}
              color={getColorByEmotionType($emotion.emotionType)}
            />
          ))}
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
  position: relative;

  &:hover {
    background-color: var(--color-primary);
  }

  p {
    color: var(--color-border);
    font-size: 1rem;
  }
`;

const StyledEmotionTag = styled.div`
  width: 80%;
  margin-top: 5px;
  padding: 2px;
  background-color: ${(props) => props.color || "var(--color-background)"};
  text-align: center;
  font-size: 0.8rem;
  border-radius: 5px;
`;
