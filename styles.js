import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

:root {
    --color-background: #f9f9f9;
    --color-frame: #e0e1f0;
    --color-secondary: #313366;
    --color-background-cards: #f9f9f9;
    --color-cards-foreground: #313366;
    --color-shadow: #4e545b;
    --color-foreground: #e0e1f0;
    --color-highlighted-foreground: #4e545b;
    --color-highlighted-background: #e0e1f0;
    --color-home-icon-foreground:#4e545b;
    --color-home-icon-background:#4e545b;
    --color-home-icon-foreground-active:#4e545b;
    --color-home-icon-background-active:#e0e1f0;
    --color-home-nav-background-active: rgba(249, 249, 249, 1);
    --color-form-foreground:#313366;
    --color-button-success: #5CB85C;
    --color-dropdown-background:#4e545b;
    --color-dropdown-foreground:#f9f9f9;
    --color-slider-intensity:#d3d3d3;
    --color-emoji-icon: #f9f9f9;
  }
  .dark-theme{
    --color-background: #1C1C1E;
    --color-frame: #4e545b;
    --color-secondary: #e0e1f0;
    --color-background-cards: #4e545b;
    --color-cards-foreground: #1C1C1E;
    --color-shadow: #4e545b;
    --color-foreground: #e0e1f0;
    --color-highlighted-foreground: #4e545b;
    --color-highlighted-background: #e0e1f0;
    --color-home-icon-foreground:#d3d3d3;
    --color-home-icon-background:#4e545b;
    --color-home-icon-foreground-active:#4e545b;
    --color-home-icon-background-active:#e0e1f0;
    --color-home-nav-background-active: #e0e1f0;
    --color-form-foreground:#e0e1f0;
    --color-button-success: #5CB85C;
    --color-dropdown-background:#1C1C1E;
    --color-dropdown-foreground:#e0e1f0;
    --color-slider-intensity:#d3d3d3;
    --color-emoji-icon: #4e545b;
  }
 

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    max-width: 760px;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
    background-color: var(--color-background);
    padding-bottom: 66px;
  }

  h1, h2 {
    font-family: "Baskerville", serif;
    font-weight: normal;
  }

  input, select, p, textarea {
    font-family: 'Roboto', sans-serif;
  }

  label {
    padding-top: 1rem;
    align-self: flex-start;
  }

  a {
  text-decoration: none;
}

`;
