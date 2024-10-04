import { initialEntries } from "@/lib/entries";
import styled from "styled-components";
import Link from "next/link";

export default function EmotionList({}) {
  return (
    <StyledEmotionList>
      {initialEntries.map((entry) => (
        <StyledLink key={entry.id} href={`emotion/${entry.id}`}>
          <StyledEmotionCard>
            <h2>{entry.emotion}</h2>
            <p>Intensity: {entry.intensity}</p>
            <StyledDateTime>{entry.dateTime}</StyledDateTime>
          </StyledEmotionCard>
        </StyledLink>
      ))}
    </StyledEmotionList>
  );
}

const StyledEmotionList = styled.ul`
  padding: 0;
`;

const StyledEmotionCard = styled.li`
  font-size: 1rem;
  margin: 16px 8px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid lightgray;
  border-radius: 8px;
  list-style: none;
`;

const StyledDateTime = styled.p`
  text-align: right;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:visited {
    color: inherit;
  }
`;
