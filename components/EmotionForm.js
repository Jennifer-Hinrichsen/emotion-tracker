import { emotions } from "@/lib/emotions";
import { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function EmotionForm({
  onCreateEmotion,
  existingEmotion,
  onUpdateEmotion,
}) {
  const router = useRouter();
  const currentDateTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState(5);
  const [selectedDateTime, setSelectedDateTime] = useState(currentDateTime);
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState(""); // Error message if not all fields are filled out on submit
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [hasError, setHasError] = useState(false); // New state variable for styling

  useEffect(() => {
    if (existingEmotion) {
      setSelectedEmotion(existingEmotion.emotion || "");
      setSelectedIntensity(existingEmotion.intensity || 5);
      setSelectedDateTime(existingEmotion.dateTime || currentDateTime);
      setNotes(existingEmotion.notes || "");
    }
  }, [existingEmotion, currentDateTime]);

  // Change emotion
  function handleEmotionChange(event) {
    setSelectedEmotion(event.target.value);
    if (event.target.value !== "") {
      setFormError(""); // Reset error message when the field is filled
      setHasError(false); // Reset styling once an emotion is selected
    }
  }

  // Change intensity
  function handleIntensityChange(event) {
    setSelectedIntensity(event.target.value);
  }

  // Change dateTime
  function handleDateTimeChange(event) {
    setSelectedDateTime(event.target.value);
    if (event.target.value) {
      setFormError(""); // Reset error message when date/time is selected
    }
  }

  // Save notes
  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  // Trigger submit
  function handleSubmit(event) {
    event.preventDefault();
    // Validate: Emotion must be selected
    if (!selectedEmotion) {
      setFormError("Please fill in the required fields.");
      setHasError(true); // Set error state for styling
      setSuccessMessage(""); // Reset success message
      return;
    }
    // Validate: DateTime must be set
    if (!selectedDateTime) {
      setFormError("Please select a date and time.");
      setSuccessMessage(""); // Reset success message
      return;
    }

    // New object
    const newEmotionEntry = {
      emotion: selectedEmotion,
      intensity: selectedIntensity,
      dateTime: selectedDateTime,
      notes: notes,
    };

    if (existingEmotion) {
      onUpdateEmotion({ id: existingEmotion.id, ...newEmotionEntry }); // Update existing object
      router.push(`/emotion/${existingEmotion.id}`);
    } else {
      onCreateEmotion(newEmotionEntry); // Pass new object
    }

    // Reset form
    setSelectedEmotion("");
    setSelectedIntensity(5);
    setSelectedDateTime(currentDateTime);
    setNotes("");
    setFormError(""); // Reset error message
    setHasError(false); // Reset error state for styling
    setSuccessMessage("Emotion successfully added!"); // Set success message
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }

  return (
    <>
      <StyledFormContainer>
        <StyledSubheadline>
          {existingEmotion ? "Update your Emotion" : "Add your Emotion"}
        </StyledSubheadline>
        <StyledEmotionForm onSubmit={handleSubmit}>
          <StyledLabel htmlFor="emotion" $hasError={hasError}>
            Emotion*
          </StyledLabel>
          <SelectEmotionContainer>
            <StyledSelectEmotion
              value={selectedEmotion}
              onChange={handleEmotionChange}
              id="emotion"
              name="emotion"
            >
              <option value="">Please choose an emotion</option>
              {emotions.map((emotion, index) => (
                <option key={index} value={emotion}>
                  {emotion}
                </option>
              ))}
            </StyledSelectEmotion>
            <StyledArrow>▼</StyledArrow>
          </SelectEmotionContainer>

          <label htmlFor="intensity">Intensity*</label>
          <StyledSliderContainer>
            <StyledSlider
              id="intensity"
              name="intensity"
              value={selectedIntensity}
              onChange={handleIntensityChange}
              type="range"
              min="1"
              max="10"
              step="1"
            />
            <p>{selectedIntensity}</p>
          </StyledSliderContainer>

          <StyledLabel htmlFor="date-time" $hasError={!selectedDateTime}>
            Date and Time*
          </StyledLabel>

          <StyledDatenAndTimeInput
            id="date-time"
            name="date-time"
            type="datetime-local"
            value={selectedDateTime}
            onChange={handleDateTimeChange}
          />

          <label htmlFor="notes">Notes</label>
          <StyledTextArea
            id="notes"
            name="notes"
            value={notes}
            placeholder="Please describe your feelings"
            maxLength="150"
            onChange={handleNotesChange}
          ></StyledTextArea>

          <StyledButton type="submit">
            {existingEmotion ? "Save" : "Submit"}
          </StyledButton>

          {/* Custom error message at the end of the form */}
          {formError && <StyledError>{formError}</StyledError>}
          {/* Success message at the end of the form */}
          {successMessage && <StyledSuccess>{successMessage}</StyledSuccess>}
        </StyledEmotionForm>
      </StyledFormContainer>
    </>
  );
}

const StyledFormContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px 0 0 0;
  background-color: #e0e1f0;
  border: 1px solid #d3d3d3;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const StyledSubheadline = styled.h2`
  margin: 0;
  padding: 10px 0;
  text-align: center;
  color: #313366;
`;

const StyledEmotionForm = styled.form`
  margin: 0;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
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

const StyledDatenAndTimeInput = styled.input`
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
  color: #313366;
  font-size: 1rem;
  cursor: text;

  &::placeholder {
    color: #8295c6;
    font-size: 1rem;
  }
`;

const StyledLabel = styled.label`
  color: ${(props) => (props.$hasError ? "#ff0000" : "#000000")};
  color: #313366;
  font-weight: ${(props) => (props.$hasError ? "bold" : "normal")};
`;

const StyledError = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 8px;
`;

const StyledSuccess = styled.p`
  color: green;
  font-size: 1rem;
  margin-top: 8px;
`;

const StyledButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #8295c6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #9acd32;
  }
`;
