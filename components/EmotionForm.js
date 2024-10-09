import { emotions } from "@/lib/emotions";
import { useState } from "react";
import styled from "styled-components";

export default function EmotionForm({ onCreateEmotion }) {
  const currentDateTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState(5);
  const [selectedDateTime, setSelectedDateTime] = useState(currentDateTime);
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState(""); // Errormeldung, wenn bei Submit nicht alle Felder ausgefüllt wurden
  const [successMessage, setSuccessMessage] = useState(""); // Successmeldung
  const [hasError, setHasError] = useState(false); // Neue State-Variable für das Styling

  // Emotion ändern
  function handleEmotionChange(event) {
    setSelectedEmotion(event.target.value);
    if (event.target.value !== "") {
      setFormError(""); // Fehlermeldung zurücksetzen, wenn das Feld befüllt wurde
      setHasError(false); // Styling zurücksetzen, sobald eine Emotion ausgewählt wurde
    }
  }

  // Intensity ändern
  function handleIntensityChange(event) {
    setSelectedIntensity(event.target.value);
  }

  // DateTime ändern
  function handleDateTimeChange(event) {
    setSelectedDateTime(event.target.value);
    if (event.target.value) {
      setFormError(""); // Fehlermeldung zurücksetzen, wenn Datum/Uhrzeit gewählt ist
    }
  }

  // Notes speichern
  function handleNotesChange(event) {
    setNotes(event.target.value);
  }

  // Submit triggern
  function handleSubmit(event) {
    event.preventDefault();
    // Validierung: Emotion muss ausgewählt sein
    if (!selectedEmotion) {
      setFormError("Please fill in the required fields.");
      setHasError(true); // Fehlerzustand für Styling setzen
      setSuccessMessage(""); // Erfolgsmeldung zurücksetzen
      return;
    }
    // Validierung: DateTime muss gesetzt sein
    if (!selectedDateTime) {
      setFormError("Please select a date and time.");
      setSuccessMessage(""); // Erfolgsmeldung zurücksetzen
      return;
    }

    // Neues Objekt
    const newEmotionEntry = {
      emotion: selectedEmotion,
      intensity: selectedIntensity,
      dateTime: selectedDateTime,
      notes: notes,
    };
    // Übergabe des neuen Objekts
    onCreateEmotion(newEmotionEntry);

    // Formular zurücksetzen
    setSelectedEmotion("");
    setSelectedIntensity(5);
    setSelectedDateTime(currentDateTime);
    setNotes("");
    setFormError(""); // Fehlernachricht zurücksetzen
    setHasError(false); // Fehlerzustand für Styling zurücksetzen
    setSuccessMessage("Emotion successfully added!"); // Erfolgsmeldung setzen
    // Erfolgsnachricht nach 5 Sekunden zurücksetzen
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }

  return (
    <>
      <StyledSubheadline>Add new Emotion</StyledSubheadline>
      <StyledEmotionForm onSubmit={handleSubmit}>
        {/* Dynamisches Label für Emotion, nur rot nach Absenden des Formulars und keiner Auswahl der Emotion */}
        <StyledLabel htmlFor="emotion" hasError={hasError}>
          Emotion (type)*
        </StyledLabel>
        <select
          value={selectedEmotion}
          onChange={handleEmotionChange}
          id="emotion"
          name="emotion"
        >
          <option value="">---Choose an emotion---</option>
          {emotions.map((emotion, index) => (
            <option key={index} value={emotion}>
              {emotion}
            </option>
          ))}
        </select>

        <label htmlFor="intensity">Emotion intensity*</label>
        <input
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

        {/* Dynamisches Label für Datum und Uhrzeit, wird sofort rot, wenn alles gelöscht wird */}
        <StyledLabel htmlFor="date-time" hasError={!selectedDateTime}>
          Date and Time*
        </StyledLabel>
        <input
          id="date-time"
          name="date-time"
          type="datetime-local"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          placeholder="Please describe your feelings"
          maxLength="150"
          onChange={handleNotesChange}
        ></textarea>

        <button type="submit">Submit</button>

        {/* Eigene Fehlermeldung am Ende der Form */}
        {formError && <StyledError>{formError}</StyledError>}
        {/* Erfolgsnachricht am Ende der Form */}
        {successMessage && <StyledSuccess>{successMessage}</StyledSuccess>}
      </StyledEmotionForm>
    </>
  );
}

// Styled Components //
const StyledSubheadline = styled.h2`
  text-align: center;
`;

const StyledEmotionForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-size: 1rem;
  margin: 16px 8px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
`;

const StyledLabel = styled.label`
  color: ${(props) => (props.hasError ? "#ff0000" : "#000000")};
  font-weight: ${(props) => (props.hasError ? "bold" : "normal")};
`;

const StyledError = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 8px;
`;

const StyledSuccess = styled.p`
  color: green;
  font-size: 0.9rem;
  margin-top: 8px;
`;
