import { useState } from "react";
import styled from "styled-components";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSearchTerm("");
    }
  };

  return (
    <StyledSearchWrapper>
      <StyledSearchInput
        type="text"
        placeholder="Search all Emotions"
        value={searchTerm}
        onChange={handleSearchInputChange}
        $isExpanded={isExpanded}
      />
      <SearchIcon onClick={toggleSearchBar}>🔍</SearchIcon>
    </StyledSearchWrapper>
  );
}

const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
  margin-right: 28px;
`;

const StyledSearchInput = styled.input`
  padding: 8px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 16px;
  font-size: 16px;
  width: ${(props) => (props.$isExpanded ? "90" : "0")};
  opacity: ${(props) => (props.$isExpanded ? "1" : "0")};
  transition: width 0.3s ease, opacity 0.3s ease;
  pointer-events: ${(props) => (props.$isExpanded ? "auto" : "none")};

  &:focus {
    outline: none;
    border-color: #313366;
  }
`;

const SearchIcon = styled.button`
  font-size: 24px;
  color: #313366;
  cursor: pointer;
  background: none;
  border: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
  margin-left: 10px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
