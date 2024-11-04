import { emotionList } from "@/lib/emotionList";
import { useState } from "react";
import styled from "styled-components";
import PlusIcon from "@/assets/formIcons/PlusIcon.svg";
import MinusIcon from "@/assets/formIcons/MinusIcon.svg";

export default function EmotionForm({ onSubmit, defaultValue, onCancel }) {
  const currentDateTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const [formVisibility, setFormVisibility] = useState(!!defaultValue);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState(
    defaultValue?.intensity || 5
  );

  function toggleVisibilityForm() {
    setFormVisibility(!formVisibility);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);

    if (!inputData.emotionType) {
      setFormError("Please choose an emotion.");
      setSuccessMessage("");
      return;
    }

    if (!inputData.dateTime) {
      setFormError("Please select a date and time.");
      setSuccessMessage("");
      return;
    }

    onSubmit(inputData);
    event.target.reset();

    setFormError("");
  }

  return (
    <>
      <StyledFormContainer>
        <StyledFormHead onClick={toggleVisibilityForm}>
          <StyledSubheadline>
            {defaultValue ? "Update your Emotion" : "Add your Emotion"}
          </StyledSubheadline>
          {!defaultValue && (
            <StyledVisibilityIcons aria-label="show-hide-form">
              {formVisibility ? <MinusIcon /> : <PlusIcon />}
            </StyledVisibilityIcons>
          )}
        </StyledFormHead>

        <StyledEmotionForm isVisible={formVisibility} onSubmit={handleSubmit}>
          <label htmlFor="emotionType">Emotion (type)*</label>
          <SelectEmotionContainer>
            <StyledSelectEmotion
              defaultValue={defaultValue?.emotionType || ""}
              id="emotionType"
              name="emotionType"
            >
              <option value="">---Choose an Emotion---</option>
              {emotionList.map((emotion) => (
                <option key={emotion.emotionType} value={emotion.emotionType}>
                  {emotion.emotionType}
                </option>
              ))}
            </StyledSelectEmotion>
            <StyledArrow>▼</StyledArrow>
          </SelectEmotionContainer>

          <label htmlFor="intensity">Emotion intensity*</label>
          <StyledSliderContainer>
            <StyledSlider
              id="intensity"
              name="intensity"
              value={selectedIntensity}
              onChange={(event) => {
                setSelectedIntensity(event.target.value);
              }}
              type="range"
              min="1"
              max="10"
              step="1"
            />

            <p>{selectedIntensity}</p>
          </StyledSliderContainer>

          <label htmlFor="date-time">Date and Time*</label>
          <StyledDateAndTimeInput
            id="date-time"
            name="dateTime"
            type="datetime-local"
            defaultValue={defaultValue?.dateTime || currentDateTime}
          />

          <label htmlFor="notes">Notes</label>
          <StyledTextArea
            id="notes"
            name="notes"
            defaultValue={defaultValue?.notes || ""}
            placeholder="Please describe your feelings"
            maxLength="150"
          ></StyledTextArea>

          <ButtonContainer>
            {defaultValue && (
              <StyledCancelButton type="button" onClick={onCancel}>
                Cancel
              </StyledCancelButton>
            )}
            <StyledButton type="submit">
              {defaultValue ? "Save" : "Submit"}
            </StyledButton>
          </ButtonContainer>
          {formError && <StyledError>{formError}</StyledError>}

          {successMessage && <StyledSuccess>{successMessage}</StyledSuccess>}
        </StyledEmotionForm>
      </StyledFormContainer>
    </>
  );
}

const StyledFormContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: #e0e1f0;
  border: 1px solid #d3d3d3;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px #000;
`;

const StyledFormHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const StyledSubheadline = styled.h2`
  margin: 0;
  padding: 10px 0;
  color: #313366;
  text-align: center;
`;

const StyledVisibilityIcons = styled.button`
  border-radius: 50px;
  width: 35px;
  height: 35px;
  border: solid 1px #313366;
  position: absolute;
  left: calc(50% + 120px);
`;

const StyledEmotionForm = styled.form`
  overflow: hidden;
  max-height: ${(props) => (props.isVisible ? "600px" : "0")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: max-height 0.5s ease, opacity 0.5s ease;
  padding: 0 1rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #313366;
`;

const SelectEmotionContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelectEmotion = styled.select`
  width: 100%;
  padding: 10px 15px;
  background-color: transparent;
  border: none;
  border-bottom: 1px dotted #8295c6;
  font-size: 1rem;
  color: #8295c6;
  outline: none;
  cursor: pointer;
  appearance: none;
`;

const StyledArrow = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #8295c6;
  pointer-events: none;
`;

const StyledSliderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSlider = styled.input`
  width: 100%;
  height: 3px;
  accent-color: #8295c6;
  cursor: pointer;
`;

const StyledDateAndTimeInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-bottom: 1px dotted #8295c6;
  background-color: transparent;
  color: #8295c6;
  font-size: 1rem;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0 10px 10px 10px;
  border: none;
  border-bottom: 1px dotted #8295c6;
  background-color: transparent;
  color: #8295c6;
  font-size: 1rem;
  cursor: text;

  &::placeholder {
    color: #8295c6;
    font-size: 1rem;
  }
`;

const StyledError = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 8px;
`;

const StyledSuccess = styled.p`
  color: #28a745;
  font-size: 1rem;
  margin-top: 8px;
`;
const StyledButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #8295c6;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9acd32;
  }
`;

const StyledCancelButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #a6a6a6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 70%;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 1px;
  margin-top: 10px;
`;
