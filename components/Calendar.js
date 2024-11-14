import { useState } from "react";
import CalendarDays from "./CalendarDays";
import styled from "styled-components";

export default function Calendar() {
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

  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
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

  return (
    <StyledCalendarContainer>
      <StyledCalendarMonth>
        <StyledButton onClick={previousMonth}>
          <span>{"<"}</span>
        </StyledButton>
        <p>
          {months[currentDay.getMonth()]} {currentDay.getFullYear()}
        </p>
        <StyledButton onClick={nextMonth}>
          <span>{">"}</span>
        </StyledButton>
      </StyledCalendarMonth>

      <StyledCalendarBody>
        <StyledTableHeader>
          {weekdays.map((weekday, index) => (
            <StyledWeekday key={index}>
              <p>{weekday}</p>
            </StyledWeekday>
          ))}
        </StyledTableHeader>
        <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay} />
      </StyledCalendarBody>
    </StyledCalendarContainer>
  );
}

const StyledCalendarContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 1rem auto 2rem auto;
`;

const StyledCalendarMonth = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;

  color: var(--color-secondary);
`;

const StyledButton = styled.button`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: #ffffff;
  border: none;
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
