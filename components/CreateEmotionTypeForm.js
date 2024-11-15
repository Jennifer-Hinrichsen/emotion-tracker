import {
  customEmotionTypes,
  customColors,
  customEmotionIcons,
} from "@/lib/customEmotionOptions";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";

export default function CreateEmotionTypeForm() {
  const router = useRouter();

  const [selectedEmotionType, setSelectedEmotionType] = useState("");
  const [selectedEmotionColor, setSelectedEmotionColor] = useState("");
  const [selectedEmotionIcon, setSelectedEmotionIcon] = useState("");
  const [formError, setFormError] = useState("");

  function handleChangeEmotionType(event) {
    setSelectedEmotionType(event.target.value);
  }

  function handleEmotionColorSelect(color, event) {
    event.preventDefault();
    setSelectedEmotionColor(color);
  }

  function handleEmotionIconSelect(customIcon) {
    setSelectedEmotionIcon(customIcon);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);

    if (!inputData.emotionType) {
      setFormError("Please choose an emotion type.");
      // setSuccessMessage("");
      return;
    }

    if (!inputData.color) {
      setFormError("Please select an emotion color.");
      // setSuccessMessage("");
      return;
    }

    // onSubmit(inputData);
    event.target.reset();
    setSelectedEmotionType("");
    setSelectedEmotionColor("");
    setFormError("");

    console.log("testlog after submitting", {
      selectedEmotionType,
      selectedEmotionColor,
    });
  }

  return (
    <StyledFormContainer>
      <StyledFormHead>
        <StyledSubheadline>Create your Emotion type</StyledSubheadline>
      </StyledFormHead>

      <StyledEmotionForm onSubmit={handleSubmit}>
        <label htmlFor="emotionType">Emotion Type*</label>
        <StyledContainer>
          <StyledEmotion
            value={selectedEmotionType}
            id="emotionType"
            name="emotionType"
            onChange={handleChangeEmotionType}
          >
            <option value="">---Choose an Emotion---</option>
            {customEmotionTypes.map((emotion) => (
              <option key={emotion.id} value={emotion.emotionType}>
                {emotion.emotionType}
              </option>
            ))}
          </StyledEmotion>
          <StyledArrow>▼</StyledArrow>
        </StyledContainer>

        <label>Color for your Emotion*</label>
        <StyledContainer>
          {customColors.map((emotion) => (
            <StyledButtonGroupColor
              key={emotion.id}
              $isSelected={selectedEmotionColor === emotion.color}
              $bgColor={emotion.color}
              onClick={(event) =>
                handleEmotionColorSelect(emotion.color, event)
              }
            ></StyledButtonGroupColor>
          ))}
        </StyledContainer>
        <input type="hidden" name="color" value={selectedEmotionColor} />

        <label htmlFor="emotionColor">Icon for your Emotion*</label>
        <StyledContainer>
          {customEmotionIcons.map((emotion) => (
            <StyledButtonGroupIcon
              key={emotion.id}
              $isSelected={selectedEmotionIcon === emotion.customIcon}
              onClick={() => handleEmotionIconSelect(emotion.customIcon)}
            >
              {emotion.customIcon}
            </StyledButtonGroupIcon>
          ))}
        </StyledContainer>

        <StyledButtonContainer>
          <StyledCancelButton type="button" onClick={() => router.push("/")}>
            Cancel
          </StyledCancelButton>
          <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
        </StyledButtonContainer>
        {formError && <StyledError>{formError}</StyledError>}
      </StyledEmotionForm>
    </StyledFormContainer>
  );
}

const StyledFormContainer = styled.div`
  width: 90%;
  margin: 16px auto;
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

const StyledEmotionForm = styled.form`
  padding: 0 1rem;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--color-secondary);
`;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledEmotion = styled.select`
  width: 100%;
  padding: 6px 0;
  background-color: transparent;
  border: none;
  border-bottom: 1px dotted var(--color-primary);
  font-size: 1rem;
  color: var(--color-primary);
  outline: none;
  cursor: pointer;
  appearance: none;
`;

const StyledArrow = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-primary);
  pointer-events: none;
`;

const StyledButtonGroupColor = styled.button`
  margin: 0 10px 10px 0;
  font-size: 1rem;
  height: 50px;
  width: 50px;
  background-color: ${(props) => props.$bgColor};
  border: ${(props) =>
    props.$isSelected ? "2px solid black" : "2px solid transparent"};
  transition: border 0.2s ease, background-color 0.2s ease;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  opacity: 70%;

  &:hover {
    border: solid black;
  }

  &:focus {
    border: 2px solid black;
    outline: none;
  }
`;

const StyledButtonGroupIcon = styled.button`
  margin-right: 10px;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: ${(props) => (props.$isSelected ? "#4caf50" : "")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  opacity: 70%;

  &:hover {
    opacity: 100%;
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

const StyledSubmitButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: var(--color-primary);
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-secondary);
  }
`;

const StyledError = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 8px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 1px;
  margin-top: 10px;
`;
