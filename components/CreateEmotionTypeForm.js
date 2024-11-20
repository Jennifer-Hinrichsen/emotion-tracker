import {
  allEmotionTypes,
  allEmotionColors,
  allEmotionIcons,
} from "@/lib/allEmotionOptions";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState } from "react";

export default function CreateEmotionTypeForm({
  onSubmit,
  customEmotionTypes,
}) {
  const router = useRouter();

  const [selectedEmotionColor, setSelectedEmotionColor] = useState("");
  const [formError, setFormError] = useState("");

  function handleChangeEmotionColor(event) {
    setSelectedEmotionColor(event.target.value);
  }

  function filteredEmotionTypes() {
    return allEmotionTypes.filter((emotion) =>
      customEmotionTypes.every(
        (type) => type.emotionType !== emotion.emotionType
      )
    );
  }
  const allCustomEmotionsUsed = filteredEmotionTypes().length === 0;

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (!data.emotionType) {
      setFormError("Please choose an emotion type.");
      return;
    }

    if (!data.color) {
      setFormError("Please select an emotion color.");
      return;
    }

    if (!data.emotionIconId) {
      setFormError("Please select an emotion icon.");
      return;
    }

    onSubmit(data);
    event.target.reset();
    setSelectedEmotionColor("");
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
          <StyledEmotion id="emotionType" name="emotionType">
            {allCustomEmotionsUsed ? (
              <option value="">---Already all Emotions selected---</option>
            ) : (
              <>
                <option value="">---Choose an Emotion Type---</option>
                {filteredEmotionTypes().map((type) => (
                  <option key={type.id} value={type.emotionType}>
                    {type.emotionType}
                  </option>
                ))}
              </>
            )}
          </StyledEmotion>
          <StyledArrow>▼</StyledArrow>
        </StyledContainer>

        <StyledRadioGroup>
          <StyledLegendColor>Choose a Color*</StyledLegendColor>
          {allEmotionColors.map((color) => (
            <StyledLabelColors
              key={color.id}
              $isSelected={selectedEmotionColor === color.color}
              $bgColor={color.color}
            >
              <StyledButtonGroupColor
                type="radio"
                name="color"
                value={color.color}
                onChange={handleChangeEmotionColor}
              />
            </StyledLabelColors>
          ))}
        </StyledRadioGroup>

        <StyledRadioGroup>
          <StyledLegendIcon>Choose an Icon*</StyledLegendIcon>
          {allEmotionIcons.map((icon) => (
            <StyledLabelIcons
              key={icon.emotionIconId}
              $isSelectedColor={selectedEmotionColor}
            >
              <StyledButtonGroupIcon
                type="radio"
                name="emotionIconId"
                value={icon.emotionIconId}
              />
              <StyledSpan>{icon.emotionIcon}</StyledSpan>
            </StyledLabelIcons>
          ))}
        </StyledRadioGroup>

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

const StyledRadioGroup = styled.fieldset`
  padding: 0;
  position: relative;
  width: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  border: none;
`;

const StyledLegendColor = styled.legend`
  padding: 20px 0;
`;

const StyledLabelColors = styled.label`
  padding: 20px 20px;
  background-color: ${(props) => props.$bgColor};
  border: ${(props) =>
    props.$isSelected
      ? "2px solid var(--color-primary)"
      : "2px solid transparent"};
  transition: border 0.3s ease, background-color 0.3s ease;
  border-radius: 0.5rem;
`;

const StyledButtonGroupColor = styled.input`
  display: none;
`;

const StyledButtonGroupIcon = styled.input`
  display: none;

  &:checked + span {
    border: 2px solid var(--color-primary);
    outline: none;
  }
`;

const StyledLegendIcon = styled.legend`
  padding-top: 10px;
`;

const StyledLabelIcons = styled.label`
  color: ${(props) => props.$isSelectedColor};
`;

const StyledSpan = styled.span`
  padding: 50px 15px 5px;
  border-radius: 0.5rem;
  border: 2px solid transparent;
`;

const StyledCancelButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #a6a6a6;
  color: white;
  border: none;
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
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
