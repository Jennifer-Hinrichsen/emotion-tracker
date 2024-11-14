import { useState } from "react";
import CalendarDays from "./CalendarDays";

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
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <div className={styles.title}>
          <h2>
            {months[currentDay.getMonth()]} {currentDay.getFullYear()}
          </h2>
        </div>
        <div className={styles.tools}>
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
        </div>
      </div>
      <div className={styles.calendarBody}>
        <div className={styles.tableHeader}>
          {weekdays.map((weekday, index) => (
            <div key={index} className={styles.weekday}>
              <p>{weekday}</p>
            </div>
          ))}
        </div>
        <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay} />
      </div>
    </div>
  );
}
