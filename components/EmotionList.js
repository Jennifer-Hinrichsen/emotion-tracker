import styled from "styled-components";
import Link from "next/link";
import EmotionCard from "./EmotionCard";
import { useState } from "react";
import { emotions } from "@/lib/emotions";

export default function EmotionList({ objects }) {
  const [selectedFilter, setSelectedFilter] = useState("");

  const filteredData = selectedFilter
    ? objects.filter((item) => item.emotion === selectedFilter)
    : objects;

  return (
    <StyledEmotionList>
      <StyledHeadline>Filter emotion type</StyledHeadline>

      <StyledDiv>
        {emotions.map((emotion) => (
          <StyledSpan
            key={emotion}
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

const StyledHeadline = styled.h2`
  text-align: center;
`;

const StyledEmotionList = styled.ul`
  padding: 0;
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
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
  margin: 5px;
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "none")};
  text-decoration: ${({ isSelected }) => (isSelected ? "underline" : "none")};
  background-color: ${({ isSelected }) => (isSelected ? "#ddd" : "#f0f0f0")};
  &:hover {
    background-color: #e0e0e0;
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;

  min-width: 100px;
  height: 40px;
  white-space: nowrap;
  text-align: center;
`;
