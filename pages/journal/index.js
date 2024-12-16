import React from "react";
import Form from "@/components/JournalForm";
import styled from "styled-components";

export default function JournalPage() {
  return (
    <Container>
      <Heading>My Journal</Heading>
      <Form />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-family: "Baskerville", serif;
`;
