import styled from "styled-components";
import Link from "next/link";
import EmotionCard from "./EmotionCard";
import { useState } from "react";
import { emotions } from "@/lib/emotions";

export default function EmotionList({ objects }) {
  const [selectedFilter, setSelectedFilter] = useState("");

  const filteredObjects = selectedFilter
    ? objects.filter((object) => object.emotionType === selectedFilter)
    : objects;

  return (
    <>
      <StyledHeadline>Filter emotion type</StyledHeadline>
      <ul>
        {emotions.map((emotion) => (
          <StyledFilterList key={emotion.id}>
            <StyledFilterButtons
              onClick={() =>
                setSelectedFilter(
                  emotion.emotionType === selectedFilter
                    ? ""
                    : emotion.emotionType
                )
              }
              $isSelected={emotion.emotionType === selectedFilter}
            >
              {emotion.emotionType}
            </StyledFilterButtons>
          </StyledFilterList>
        ))}
      </ul>

      {filteredObjects.length === 0 ? (
        <StyledMessage>
          At the moment there are no emotions in the list. Please add an
          emotion.
        </StyledMessage>
      ) : (
        <ul>
          {filteredObjects.map((object) => (
            <StyledCardList key={object.id}>
              <StyledLink StyledLink href={`emotion/${object.id}`}>
                <EmotionCard object={object} />
              </StyledLink>
            </StyledCardList>
          ))}
        </ul>
      )}
    </>
  );
}

const StyledHeadline = styled.h2`
  text-align: center;
`;

const StyledFilterList = styled.li`
  display: inline-flex;
  list-style-type: none;
`;

const StyledFilterButtons = styled.button`
  margin: 5px;
  border-radius: 15px;
  border-color: white;
  min-width: 100px;
  height: 40px;
  font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "normal")};
  text-decoration: ${({ $isSelected }) => ($isSelected ? "underline" : "none")};
  background-color: ${({ $isSelected }) => ($isSelected ? "#ddd" : "#f0f0f0")};
`;

const StyledMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.1rem;
  padding: 24px 16px;
`;

const StyledCardList = styled.li`
  list-style-type: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:visited {
    color: inherit;
  }
`;
