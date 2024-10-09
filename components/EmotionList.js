import styled from "styled-components";
import Link from "next/link";
import EmotionCard from "./EmotionCard";

export default function EmotionList({ entries }) {
  return (
    <StyledEmotionList>
      {entries.map((entry) => (
        <StyledLink key={entry.id} href={`emotion/${entry.id}`}>
          <li>
            <EmotionCard entry={entry} />
          </li>
        </StyledLink>
      ))}
    </StyledEmotionList>
  );
}

const StyledEmotionList = styled.ul`
  padding: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:visited {
    color: inherit;
  }
`;
