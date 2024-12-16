import React, { useState } from "react";
import formatDate from "./TransformDateTime";
import JournalCard from "./JournalCard";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";

export default function JournalForm() {
  const [entries, setEntries] = useLocalStorageState("journalEntries", []);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

  const handleSubmit = (event) => {
    event.preventDefault();

    const newEntry = {
      subject,
      text,
      date: selectedDate,
    };

    setEntries((entries) => [...(entries || []), newEntry]);
    setSubject("");
    setText("");
    setSelectedDate(new Date().toISOString());
  };

  const { date, time } = formatDate(selectedDate);
  const handleDelete = (indexToDelete) => {
    setEntries((entries) =>
      entries.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <>
      <StyledFormContainer>
        <FormTitle>Journal Entry</FormTitle>
        <FormWrapper>
          <StyledJournalForm onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                placeholder="write something..."
                id="subject"
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              />
            </div>

            <StyledDateAndTimeInput
              id="date-time"
              name="dateTime"
              type="datetime-local"
              value={selectedDate.slice(0, 16)}
              onChange={(event) => setSelectedDate(event.target.value)}
            />

            <div>
              <Label htmlFor="text">Your Journal Entry</Label>
              <Textarea
                placeholder="How are you today?"
                id="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </div>

            <SubmitButton type="submit">Add Entry</SubmitButton>
          </StyledJournalForm>
        </FormWrapper>
      </StyledFormContainer>

      <CardWrapper>
        {entries && entries.length > 0 ? (
          entries.map((entry, index) => (
            <JournalCard
              key={index}
              journalEntry={entry}
              onDelete={() => handleDelete(index)}
            />
          ))
        ) : (
          <p>No entries yet</p>
        )}
      </CardWrapper>
    </>
  );
}

const StyledFormContainer = styled.div`
  width: 100%;
  background-color: var(--color-frame);
  box-shadow: 0 1px 4px var(--color-shadow);
  border-radius: 0.5rem;
`;

const FormWrapper = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 0px;
  box-sizing: border-box;
  background-color: var(--color-background);

  body.dark-theme & {
    background-color: var(--color-background);
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  margin: 0;
  padding: 10px 0;
  color: var(--color-secondary);
`;

const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  padding: 0;
  color: #555;

  body.dark.theme & {
    color: #fff;
  }
`;

const Input = styled.input`
  width: 100%;
  /* padding: 10px; */
  font-size: 1rem;
  border: none;
  border-top: 1px dotted var(--color-form-foreground);
  border-bottom: 1px dotted var(--color-form-foreground);

  border-radius: 4px;
  /* margin-bottom: 20px; */
  box-sizing: border-box;
  background-color: var(--color-background);
  &::placeholder {
    padding-top: 0;
    color: var(--color-form-foreground);
    font-size: 1rem;
  }
  body.dark-theme & {
    background-color: var(--color-background);
    color: #fff;
  }
`;

const Textarea = styled.textarea`
  padding: 0;
  height: 400px;
  max-height: 1000px;
  line-height: 1.5;
  max-width: 100%;
  min-width: 100%;
  border: none;

  border-top: 1px dotted var(--color-form-foreground);
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

const SubmitButton = styled.button`
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

const CardWrapper = styled.div`
  width: 100%;
  margin: 0;
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

const StyledJournalForm = styled.form`
  background-color: var(--color-background);

  body.dark-theme & {
    background-color: var(--color-background);
  }
`;
