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

  const nextDay = () => {
    setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() + 1)));
  };

  const previousDay = () => {
    setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() - 1)));
  };

  return (
    <StyledCalendarContainer>
      <StyledCalendarHeader>
        <StyledTitle>
          <h2>
            {months[currentDay.getMonth()]} {currentDay.getFullYear()}
          </h2>
        </StyledTitle>
        <StyledTools>
          <button onClick={previousDay}>
            <span className="material-icons">arrow_back</span>
          </button>
          <p>
            {months[currentDay.getMonth()].substring(0, 3)}{" "}
            {currentDay.getDate()}
          </p>
          <button onClick={nextDay}>
            <span className="material-icons">arrow_forward</span>
          </button>
        </StyledTools>
      </StyledCalendarHeader>
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
  width: 900px;
  height: 600px;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
`;

const StyledCalendarHeader = styled.div`
  width: 100%;
  height: 50px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;

  h2 {
    margin: auto;
  }
`;

const StyledTools = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;

  button {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: #ffffff;
    border: none;

    span:hover {
      color: #99cccc;
    }
  }
`;

const StyledCalendarBody = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyledTableHeader = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledWeekday = styled.div`
  width: 100px;
  text-align: center;
`;

const StyledTableContent = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
`;

const CalendarDay = styled.div`
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
