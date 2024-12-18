import Link from "next/link";
import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledLink href="/about">About</StyledLink>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
  margin-bottom: 32px;
`;

const StyledLink = styled(Link)`
  color: var(--color-secondary);
`;
