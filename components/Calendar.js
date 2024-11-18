import { useState } from "react";
import CalendarDays from "./CalendarDays";
import styled from "styled-components";
import CalendarPopup from "./CalendarPopup";

export default function Calendar({ emotions }) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentDay, setCurrentDay] = useState(new Date());

  const [selectedDay, setSelectedDay] = useState(null);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setPopupVisible(true);
  };

  const nextMonth = () => {
    setCurrentDay((prevDate) => {
      const newMonth = prevDate.getMonth() + 1;
      return new Date(prevDate.getFullYear(), newMonth, 1);
    });
  };

  const previousMonth = () => {
    setCurrentDay((prevDate) => {
      const newMonth = prevDate.getMonth() - 1;
      return new Date(prevDate.getFullYear(), newMonth, 1);
    });
  };

  const getEmotionsForDay = (date) => {
    return emotions.filter(($emotion) => {
      const emotionDate = new Date($emotion.dateTime);
      return emotionDate.toDateString() === date.toDateString();
    });
  };

  return (
    <StyledCalendarContainer>
      <StyledCalendarMonth>
        <StyledArrowButton onClick={previousMonth}>
          <span>{"<"}</span>
        </StyledArrowButton>
        <p>
          {months[currentDay.getMonth()]} {currentDay.getFullYear()}
        </p>
        <StyledArrowButton onClick={nextMonth}>
          <span>{">"}</span>
        </StyledArrowButton>
      </StyledCalendarMonth>

      <StyledCalendarBody>
        <StyledTableHeader>
          {weekdays.map((weekday, index) => (
            <StyledWeekday key={index}>
              <p>{weekday}</p>
            </StyledWeekday>
          ))}
        </StyledTableHeader>
        <CalendarDays
          day={currentDay}
          changeCurrentDay={changeCurrentDay}
          emotions={emotions}
          onDayClick={handleDayClick}
          getEmotionsForDay={getEmotionsForDay}
        />
      </StyledCalendarBody>
      {isPopupVisible && selectedDay && (
        <CalendarPopup
          getEmotionsForDay={getEmotionsForDay}
          selectedDay={selectedDay}
          setPopupVisible={setPopupVisible}
        />
      )}
    </StyledCalendarContainer>
  );
}

const StyledCalendarContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 1rem auto 2rem;
`;

const StyledCalendarMonth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-secondary);
`;

const StyledArrowButton = styled.button`
  margin: auto;
  display: flex;
  justify-content: center;
  background-color: var(--color-background);
  border: none;
  cursor: pointer;
`;

const StyledCalendarBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledTableHeader = styled.div`
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledWeekday = styled.div`
  width: 100px;
  text-align: center;
`;
