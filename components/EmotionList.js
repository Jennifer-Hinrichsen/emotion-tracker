import styled from "styled-components";
import Link from "next/link";
import EmotionCard from "./EmotionCard";
import { useState } from "react";
import { emotions } from "@/lib/emotions";

export default function EmotionList({ objects }) {
  const [selectedFilter, setSelectedFilter] = useState("");

  // Verwende filteredData, um die Objekte basierend auf dem Filter zu filtern
  const filteredData = selectedFilter
    ? objects.filter((item) => item.emotion === selectedFilter)
    : objects; // Wenn nichts ausgewählt ist, zeige alle

  return (
    <StyledEmotionList>
      <StyledDiv>
        <h2>Filter emotion type</h2>
        {emotions.map((emotion) => (
          <StyledSpan
            key={emotion}
            // Wenn emotion bereits ausgewählt ist, setze den Filter zurück
            onClick={() =>
              setSelectedFilter(emotion === selectedFilter ? "" : emotion)
            }
            isSelected={emotion === selectedFilter}
          >
            {emotion}
          </StyledSpan>
        ))}
      </StyledDiv>

      {filteredData.length === 0 ? (
        <StyledMessage>
          At the moment there are no emotions in the list. Please add an
          emotion.
        </StyledMessage>
      ) : (
        filteredData.map((object) => (
          <StyledLink key={object.id} href={`emotion/${object.id}`}>
            <li>
              <EmotionCard object={object} />
            </li>
          </StyledLink>
        ))
      )}
    </StyledEmotionList>
  );
}

const StyledEmotionList = styled.ul`
  padding: 0;
`;

const StyledDiv = styled.div`
  display: flex;
  background-color: grey;
`;

const StyledMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.1rem;
  padding: 24px 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:visited {
    color: inherit;
  }
`;

const StyledSpan = styled.span`
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
  text-decoration: ${({ isSelected }) => (isSelected ? "underline" : "none")};
  background-color: ${({ isSelected }) =>
    isSelected
      ? "#ddd"
      : "#f0f0f0"}; // Ändere die Farbe des ausgewählten Filters
  &:hover {
    background-color: #e0e0e0;
  }
`;
