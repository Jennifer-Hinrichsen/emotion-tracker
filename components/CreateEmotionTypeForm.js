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

  const [selectedEmotionIcon, setSelectedEmotionIcon] = useState("");

  const handleEmotionIconSelect = (customIcon) => {
    setSelectedEmotionIcon(customIcon);
  };

  return (
    <StyledFormContainer>
      <StyledFormHead>
        <StyledSubheadline>Create your Emotion type</StyledSubheadline>
      </StyledFormHead>

      <StyledEmotionForm>
        <label htmlFor="emotionType">Emotion Type*</label>
        <StyledSelectEmotionContainer>
          <StyledSelectEmotion
            id="emotionType"
            name="emotionType"
            // onChange={handleChangeEmotionType}
          >
            <option value="">---Choose an Emotion---</option>
            {customEmotionTypes.map((emotion) => (
              <option key={emotion.id} value={emotion.emotionType}>
                {emotion.emotionType}
              </option>
            ))}
          </StyledSelectEmotion>
          <StyledArrow>▼</StyledArrow>
        </StyledSelectEmotionContainer>
        <label htmlFor="emotionType">Color for your Emotion*</label>
        <StyledSelectEmotionContainer>
          <StyledSelectEmotion
            id="emotionType"
            name="emotionType"
            // onChange={handleChangeEmotionType}
          >
            <option value="">---Choose a Color---</option>
            {customColors.map((emotion) => (
              <option key={emotion.id} value={emotion.color}>
                {emotion.color}
              </option>
            ))}
          </StyledSelectEmotion>
          <StyledArrow>▼</StyledArrow>
        </StyledSelectEmotionContainer>
        <label htmlFor="emotionType">Icon for your Emotion*</label>
        <StyledEmojiContainer>
          {customEmotionIcons.map((emotion) => (
            <StyledEmojiIcon
              key={emotion.id}
              $isSelected={selectedEmotionIcon === emotion.customIcon}
              onClick={() => handleEmotionIconSelect(emotion.customIcon)}
            >
              {emotion.customIcon}
            </StyledEmojiIcon>
          ))}
        </StyledEmojiContainer>
        <StyledButtonContainer>
          <StyledCancelButton type="button" onClick={() => router.push("/")}>
            Cancel
          </StyledCancelButton>
          <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
        </StyledButtonContainer>
      </StyledEmotionForm>
    </StyledFormContainer>
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

const StyledSelectEmotionContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelectEmotion = styled.select`
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

const StyledEmojiContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`;

const StyledEmojiIcon = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#4caf50" : "var--color-background"};
  color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#000")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  opacity: 70%;

  &:hover {
    opacity: 100%;
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

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 1px;
  margin-top: 10px;
`;
