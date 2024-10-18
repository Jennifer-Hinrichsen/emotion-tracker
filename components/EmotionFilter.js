import { useState } from "react";
import { initialObjects } from "@/lib/initialObjects";
import styled from "styled-components";
import { emotions } from "@/lib/emotions";

export default function EmotionFilter() {
  const [selectedFilter, setSelectedFilter] = useState("");

  // Filter the objects based on selectedFilter
  // const filteredObjects = initialObjects.filter((item) =>
  //   item.emotion.toLowerCase().includes(selectedFilter.toLowerCase())
  // );

  // Funktion zum Filtern der Daten
  const filteredData = selectedFilter
    ? initialObjects.filter((item) => item.emotion === selectedFilter)
    : initialObjects; // Wenn nichts ausgewählt ist, zeige alle

  return (
    <>
      <h2>Filter emotion type</h2>
      {emotions.map((emotion) => (
        <StyledSpan
          key={emotion}
          onClick={() => setSelectedFilter(emotion === "" ? "" : emotion)}
        >
          {emotion}
        </StyledSpan>
      ))}
      {/* <select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="Anger">Anger</option>
        <option value="Enjoyment">Enjoyment</option>
        <option value="Fear">Fear</option>
      </select>
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
    </>
  );
}
const StyledSpan = styled.span`
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
  background-color: ${({ selectedFilter }) =>
    selectedFilter ? "#ddd" : "#f0f0f0"};
  &:hover {
    background-color: #e0e0e0;
  }
`;
