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
    --color-background-cards: #f9f9f9;
    --color-secondary-cards: #313366;
  }
  .dark-theme{
    --color-background: #1C1C1E;
    --color-frame: #4e545b;
    --color-secondary: #e0e1f0;
    --color-background-cards: #4e545b;
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
