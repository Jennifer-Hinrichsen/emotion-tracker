import styled from "styled-components";

export default function Heading({ children }) {
  return <StyledHeadline>{children}</StyledHeadline>;
}

const StyledHeadline = styled.h1`
  text-align: center;
  margin-bottom: 0;
  color: var(--color-secondary);
`;
