import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
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
    --color-home-icon-foreground:#d3d3d3;
    --color-home-icon-background:#4e545b;
    --color-home-icon-foreground-active:#4e545b;
    --color-home-icon-background-active:#e0e1f0;
    --color-home-nav-background-active: rgba(249, 249, 249, 1);
    --color-form-foreground:#313366;
    --color-button-success: #5CB85C;
    --color-dropdown-background:#4e545b;
    --color-dropdown-foreground:#f9f9f9;
    --color-slider-intensity:#d3d3d3;
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

  .container-dots {
    position: fixed;
    top:0;
    width: 100vw; 
    height: 100vh; 
    background: linear-gradient(45deg, var(--color-frame), var(--color-secondary));
    z-index: 3;
  }

  .logo {
    position: absolute;
    width: 300px;
    height: auto;
    top: 40%; 
    left: 14%; 
    transform: translate(-50%, -50%); 
    color: var(--color-cards-foreground);
    z-index: 5; 
    opacity: 0; 
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
