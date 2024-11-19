import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-background: #f9f9f9;
    --color-primary: #8295c6;
    --color-secondary: #313366;
    --color-border: #d3d3d3;
    --color-success: #5cb85c; 
    --color-shadow: #00000029;
    --color-frame: #e0e1f0;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background-color: var(--color-background);
    padding-bottom: 66px;
  }

  h1, h2 {
    font-family: "Baskerville", serif;
    font-weight: normal;
  }

  input, select, p, textarea {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  label {
    padding-top: 1rem;
    align-self: flex-start;
  }

  a {
  text-decoration: none;
}
`;
