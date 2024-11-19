import { emotionList } from "@/lib/emotionList";
import { useState } from "react";
import styled from "styled-components";
import PlusIcon from "@/assets/formIcons/PlusIcon.svg";
import MinusIcon from "@/assets/formIcons/MinusIcon.svg";
import SliderIntensity from "./SliderIntensity";

export default function EmotionForm({ onSubmit, defaultValue, onCancel }) {
  const currentDateTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const [formVisibility, setFormVisibility] = useState(!!defaultValue);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedEmotionType, setSelectedEmotionType] = useState(
    defaultValue?.emotionType || ""
  );
  const [selectedIntensity, setSelectedIntensity] = useState(
    defaultValue?.intensity || 1
  );

  function handleChangeEmotionType(event) {
    setSelectedEmotionType(event.target.value);
  }

  function toggleVisibilityForm() {
    setFormVisibility(!formVisibility);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);
    inputData.intensity = selectedIntensity;

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
    setSelectedEmotionType("");
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

        <StyledEmotionForm $isVisible={formVisibility} onSubmit={handleSubmit}>
          <label htmlFor="emotionType">Emotion (type)*</label>
          <SelectEmotionContainer>
            <StyledSelectEmotion
              value={selectedEmotionType}
              id="emotionType"
              name="emotionType"
              onChange={handleChangeEmotionType}
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
          <SliderIntensity
            emotionType={selectedEmotionType}
            defaultIntensity={selectedIntensity}
            onChange={(intensity) => setSelectedIntensity(intensity)}
          />

          <StyledLabelNoPadding htmlFor="date-time">
            Date and Time*
          </StyledLabelNoPadding>
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
  background-color: var(--color-frame);
  border: 1px solid (--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px var(--color-shadow);
  margin-bottom: 48px;
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
  color: var(--color-secondary);
  text-align: center;
`;

const StyledVisibilityIcons = styled.button`
  border-radius: 50px;
  width: 35px;
  height: 35px;
  border: solid 1px var(--color-secondary);
  background-color: var(--color-background);
  position: absolute;
  left: calc(50% + 120px);
  color: var(--color-secondary);
  body.dark-theme & {
    background-color: var(--color-frame);
  }
`;

const StyledEmotionForm = styled.form`
  overflow: hidden;
  max-height: ${(props) => (props.$isVisible ? "600px" : "0")};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: max-height 0.5s ease, opacity 0.5s ease;
  padding: 0 1rem;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--color-form-foreground);
`;

const SelectEmotionContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelectEmotion = styled.select`
  width: 100%;
  padding: 6px 0;
  background-color: transparent;
  border: none;
  border-bottom: 1px dotted var(--color-form-foreground);
  font-size: 1rem;
  color: var(--color-form-foreground);
  outline: none;
  cursor: pointer;
  appearance: none;
`;

const StyledArrow = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-form-foreground);
  pointer-events: none;
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

const StyledLabelNoPadding = styled.label`
  padding: 0;
`;

const StyledTextArea = styled.textarea`
  padding: 0;
  height: 36px;
  max-height: 300px;
  line-height: 1.5;
  max-width: 100%;
  min-width: 100%;
  border: none;
  border-bottom: 1px dotted var(--color-form-foreground);
  background-color: transparent;
  color: var(--color-form-foreground);
  font-size: 1rem;
  cursor: text;

  &::placeholder {
    padding-top: 0;
    color: var(--color-form-foreground);
    font-size: 1rem;
  }
`;

const StyledError = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 8px;
`;

const StyledSuccess = styled.p`
  color: var(--color-button-success);
  font-size: 1rem;
  margin-top: 8px;
`;
const StyledButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: var(--color-form-foreground);
  color: var(--color-background-cards);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-button-success);
  }

  &.clicked {
    animation: greenFlash 6s forwards;
  }

  @keyframes greenFlash {
    0% {
      background-color: var(--color-form-foreground);
    }
    50% {
      background-color: var(--color-button-success);
    }
    100% {
      background-color: var(--color-form-foreground);
    }
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
