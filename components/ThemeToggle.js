import { useState, useEffect } from "react";
import SunTheme from "assets/SunTheme.svg";
import MoonTheme from "assets/MoonTheme.svg";
import styled from "styled-components";
import styles from "@/styles";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <SwitchContainer>
      <Input
        type="checkbox"
        id="switch"
        checked={theme === "dark"}
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <Label htmlFor="switch">
        <Slider>{theme === "dark" ? <MoonIcon /> : <SunIcon />}</Slider>
      </Label>
    </SwitchContainer>
  );
}

const SwitchContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Input = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const Label = styled.label`
  cursor: pointer;
  width: 60px;
  height: 34px;
  background: var(--color-frame);
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 8px;
  transition: background 0.3s ease-in-out;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);

  ${Input}:checked + & {
    background: #4e545b;
  }
`;

const Slider = styled.span`
  width: 28px;
  height: 28px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.3s ease;

  ${Input}:checked + ${Label} & {
    left: calc(100% - 30px);
  }
`;

const SunIcon = styled(SunTheme)`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const MoonIcon = styled(MoonTheme)`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
