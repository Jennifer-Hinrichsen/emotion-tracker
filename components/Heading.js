import styled from "styled-components";

export default function Heading({ children }) {
  return <StyledHeadline>{children}</StyledHeadline>;
}

const StyledHeadline = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: var(--color-secondary);
`;
