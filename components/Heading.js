import styled from "styled-components";

export default function Heading({ children }) {
  return <StyledHeadline>{children}</StyledHeadline>;
}

const StyledHeadline = styled.h1`
  text-align: center;
`;
