import styled from "styled-components";

export default function CalendarDays({ day, changeCurrentDay, emotions }) {
  const firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  const currentDate = new Date(firstDayOfMonth);

  console.log(emotions);

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
    return emotions.filter((emotion) => {
      const emotionDate = new Date(emotion.dateTime);
      return emotionDate.toDateString() === date.toDateString();
    });
  };

  return (
    <StyledTableContent>
      {currentDays.map((calendarDay, index) => {
        const emotionsForDay = getEmotionsForDay(calendarDay.date);

        return (
          <StyledCalendarDay
            key={index}
            $currentMonth={calendarDay.$currentMonth}
            $selected={calendarDay.$selected}
            onClick={() => changeCurrentDay(calendarDay)}
          >
            <p>{calendarDay.number}</p>
            {emotionsForDay.map((emotion) => (
              <EmotionTag key={emotion.id} emotion={emotion} />
            ))}
          </StyledCalendarDay>
        );
      })}
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
  border: 1px solid #a6a6a6;
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

const EmotionTag = styled.div`
  width: 80%;
  margin-top: 5px;
  padding: 2px;
  background-color: ${(props) => props.emotion.color || "#ccc"};
  color: #fff;
  text-align: center;
  font-size: 0.8rem;
  border-radius: 5px;
`;
