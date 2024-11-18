import styled from "styled-components";
import { useState } from "react";

export default function CalendarPopup({
  getEmotionsForDay,
  selectedDay,
  setPopupVisible,
}) {
  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <StyledPopup>
      <StyledPopupContent>
        <h2>Emotions</h2>
        <ul>
          {getEmotionsForDay(selectedDay.date).map(($emotion) => (
            <li key={$emotion.id}>
              <StyledEmotionDot color={$emotion.color} />
              {$emotion.emotionType}
            </li>
          ))}
        </ul>
        <StyledCloseButton onClick={closePopup}>Close</StyledCloseButton>
      </StyledPopupContent>
    </StyledPopup>
  );
}

const StyledPopup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 40%;
  background-color: #e0e1f0;
`;

const StyledPopupContent = styled.div`
  background-color: var(--color-background-light);
  padding: 1rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const StyledEmotionDot = styled.span`
  background-color: ${(props) => props.color};
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const StyledCloseButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #95a5a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #7f8c8d;
  }
`;
