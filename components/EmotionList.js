import styled from "styled-components";
import Link from "next/link";
import EmotionCard from "./EmotionCard";

export default function EmotionList({ objects }) {
  return (
    <StyledEmotionList>
      {objects.length === 0 ? (
        <StyledMessage>
          At the moment there are no emotions in the list. Please add an
          emotion.
        </StyledMessage>
      ) : (
        objects.map((object) => (
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
