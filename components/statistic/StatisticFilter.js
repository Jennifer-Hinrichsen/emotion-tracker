import { useState } from "react";
import styled from "styled-components";

export default function StatisticFilter() {
  // Zustand für den ausgewählten Monat
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  // Funktion zum Berechnen des aktuellen Monats im Format YYYY-MM
  function getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Monat 0-basiert
    return `${year}-${month}`;
  }

  // Event-Handler, wenn der Monat geändert wird
  function handleMonthChange(event) {
    setSelectedMonth(event.target.value);
  }

  return (
    <Styled>
      <StyledZwo>
        <StyledDrei>
          <label htmlFor="month">Month</label>
          <StyledDateAndTimeInput
            type="month"
            id="month"
            name="month"
            value={selectedMonth} // Verknüpft mit Zustand
            onChange={handleMonthChange} // Ändert den Zustand bei Änderungen
          />
        </StyledDrei>
        <StyledDrei>
          <label htmlFor="calendarWeek">Calendarweek</label>
          <StyledDateAndTimeInput
            type="number"
            id="calendarWeek"
            name="calendarWeek"
          />
        </StyledDrei>
      </StyledZwo>
    </Styled>
  );
}

const Styled = styled.div`
  background-color: var(--color-slider-intensity);
  padding: 12px;
`;

const StyledZwo = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledDrei = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledDateAndTimeInput = styled.input`
  padding: 0 0 6px 0;
  width: 100%;
  border: none;
  border-bottom: 1px dotted var(--color-form-foreground);
  background-color: transparent;
  color: var(--color-form-foreground);
  font-size: 1rem;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    color: var(--color-form-foreground);
  }
`;
