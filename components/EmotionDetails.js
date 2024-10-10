import EmotionCard from "./EmotionCard";
import Heading from "./Heading";
import styled from "styled-components";
import Link from "next/link";

export default function EmotionDetails({ entry, onDeleteEmotion }) {
  function handleDelete() {
    onDeleteEmotion(entry.id);
  }
  return (
    <>
      <Heading>Emotion Details</Heading>
      <StyledLink aria-label="navigate-home" href="/">
        ←
      </StyledLink>
      <EmotionCard entry={entry} />
      {/* Die ID des Eintrags muss übergeben werden */}
      <StyledButtonDelete type="button" onClick={handleDelete}>
        Delete
      </StyledButtonDelete>
    </>
  );
}

const StyledLink = styled(Link)`
  font-size: 24px;
  margin-left: 10px;
  text-decoration: none;
  color: #000;
`;

const StyledContainer = styled.div`
  font-size: 1rem;
  margin: 16px 8px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  list-style: none;
`;

const StyledDateTime = styled.p`
  text-align: right;
`;
const StyledButtonDelete = styled.button`
  float: right;
  margin-right: 20px;
`;
