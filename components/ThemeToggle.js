import { useTheme } from "next-themes";
import SunTheme from "assets/SunTheme.svg";
import MoonTheme from "assets/MoonTheme.svg";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
        <Slider>{theme === "light" ? <SunTheme /> : <MoonTheme />}</Slider>
      </Label>
    </SwitchContainer>
  );
}

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const Label = styled.label`
  cursor: pointer;
  width: 80px;
  height: 40px;
  background: var(--color-frame);
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 5px;
  transition: background 0.3s;

  ${Input}:checked + & {
    background: #4e545b;
  }
`;

const Slider = styled.span`
  width: 30px;
  height: 30px;
  background: var(--color-frame);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  left: 5px;
  transition: left 0.3s ease;

  ${Input}:checked + ${Label} & {
    left: calc(100% - 35px);
  }
`;

// Falls du auch die Icons kleiner machen möchtest:
const SunIcon = styled(SunTheme)`
  width: 18px;
  height: 18px;
`;

const MoonIcon = styled(MoonTheme)`
  width: 18px;
  height: 18px;
`;
