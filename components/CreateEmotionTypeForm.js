import { customEmotionTypes, customColors } from "@/lib/customEmotionOptions";
import { emotionsIcons } from "./EmotionIcons";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";

export default function CreateEmotionTypeForm({ onSubmit }) {
  const router = useRouter();

  const [selectedEmotionType, setSelectedEmotionType] = useState("");
  const [selectedEmotionColor, setSelectedEmotionColor] = useState("");
  const [selectedEmotionIcon, setSelectedEmotionIcon] = useState("");
  const [formError, setFormError] = useState("");

  function handleChangeEmotionType(event) {
    setSelectedEmotionType(event.target.value);
  }

  function handleChangeEmotionColor(event, color) {
    event.preventDefault();
    setSelectedEmotionColor(color);
  }

  function handleChangeEmotionIcon(event, emotionId) {
    event.preventDefault();
    setSelectedEmotionIcon(emotionId);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);

    if (!inputData.emotionType) {
      setFormError("Please choose an emotion type.");
      return;
    }

    if (!inputData.color) {
      setFormError("Please select an emotion color.");
      return;
    }

    if (!selectedEmotionIcon) {
      setFormError("Please select an emotion icon.");
      return;
    }

    // Beispiel: Emotion-Icon später aus Array abrufen
    // const matchedIcon = emotionsIcons.find(
    //   (icon) => icon.id === selectedEmotionIcon
    // );
    // console.log("Selected Emotion Icon Element:", matchedIcon?.emotionIcon);

    onSubmit(inputData);
    event.target.reset();
    setSelectedEmotionType("");
    setSelectedEmotionColor("");
    setSelectedEmotionIcon("");
    setFormError("");
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
                handleChangeEmotionColor(event, emotion.color)
              }
            ></StyledButtonGroupColor>
          ))}
        </StyledContainer>
        <input type="hidden" name="color" value={selectedEmotionColor} />

        <label htmlFor="emotionIcon">Icon for your Emotion*</label>
        <StyledContainer>
          {emotionsIcons.map((emotion) => (
            <StyledButtonGroupIcon
              key={emotion.id}
              $isSelected={selectedEmotionIcon === emotion.emotionIcon}
              $isSelectedColor={selectedEmotionColor} // ausgewählte Farbe
              onClick={(event) => handleChangeEmotionIcon(event, emotion.id)}
            >
              {emotion.emotionIcon}
            </StyledButtonGroupIcon>
          ))}
        </StyledContainer>

        <input type="hidden" name="emotionIcon" value={selectedEmotionIcon} />

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
  margin: 0 8px 10px 0;
  font-size: 1rem;
  height: 50px;
  width: 50px;
  background-color: ${(props) => props.$bgColor};
  border: ${(props) =>
    props.$isSelected
      ? "2px solid var(--color-primary)"
      : "2px solid transparent"};
  transition: border 0.3s ease, background-color 0.3s ease;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border: solid var(--color-primary);
  }

  &:focus {
    border: 2px solid var(--color-primary);
    outline: none;
  }
`;

const StyledButtonGroupIcon = styled.button`
  margin: 0 8px 10px 0;
  font-size: 1rem;
  border: ${(props) =>
    props.$isSelected
      ? "2px solid var(--color-primary)"
      : "2px solid transparent"};
  color: ${(props) => props.$isSelectedColor};
  transition: fill 0.3s ease, color 0.3s ease, border 0.3s ease;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border: solid var(--color-primary);
  }

  &:focus {
    border: 2px solid var(--color-primary);
    outline: none;
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
    background-color: var(--color-success);
  }

  &.clicked {
    animation: greenFlash 6s forwards;
  }

  @keyframes greenFlash {
    0% {
      background-color: var(--color-primary);
    }
    50% {
      background-color: var(--color-success);
    }
    100% {
      background-color: var(--color-primary);
    }
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
