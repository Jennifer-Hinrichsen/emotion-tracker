import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { initialEmotionTypes } from "@/lib/initialEmotionTypes";
import useScreenSize from "../lib/hooks/useScreenSize";

export default function Filter({ selectedFilter, setSelectedFilter }) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);
  const screenSize = useScreenSize();

  function updateArrowVisibility() {
    const tabsBox = scrollContainerRef.current;
    if (tabsBox) {
      const canScrollLeft = tabsBox.scrollLeft > 0;
      const canScrollRight =
        tabsBox.scrollWidth > tabsBox.clientWidth + tabsBox.scrollLeft;
      setShowLeftArrow(canScrollLeft);
      setShowRightArrow(canScrollRight);
    }
  }

  function scrollTabsHorizontally(direction) {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -100 : 100;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    const tabsBox = scrollContainerRef.current;
    if (tabsBox) {
      tabsBox.scrollLeft = (tabsBox.scrollWidth - tabsBox.clientWidth) / 2;
      updateArrowVisibility();
    }
  }, [screenSize.width]);

  return (
    <>
      <StyledDivWrapper>
        <StyledWrapper>
          {showLeftArrow && (
            <StyledIconLeft
              aria-label="Icon to slide the filter to the left"
              onClick={() => scrollTabsHorizontally("left")}
            >
              &#9664;
            </StyledIconLeft>
          )}
          <StyledTabsBox
            ref={scrollContainerRef}
            onScroll={updateArrowVisibility}
          >
            {initialEmotionTypes.map((emotion) => (
              <StyledTab
                key={emotion.id}
                onClick={() =>
                  setSelectedFilter(
                    emotion.emotionType === selectedFilter
                      ? ""
                      : emotion.emotionType
                  )
                }
                $isSelected={emotion.emotionType === selectedFilter}
                $color={emotion.color}
              >
                {emotion.emotionType}
              </StyledTab>
            ))}
          </StyledTabsBox>
          {showRightArrow && (
            <StyledIconRight
              aria-label="Icon to slide the filter to the right"
              onClick={() => scrollTabsHorizontally("right")}
            >
              &#9654;
            </StyledIconRight>
          )}
        </StyledWrapper>
      </StyledDivWrapper>
      <StyledAppliedInfo>
        {selectedFilter ? (
          <>
            #{selectedFilter}
            <StyledClearFilter onClick={() => setSelectedFilter("")}>
              ×
            </StyledClearFilter>
          </>
        ) : (
          ""
        )}
      </StyledAppliedInfo>
    </>
  );
}

const StyledDivWrapper = styled.div`
  background-color: #f6f4f3;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
`;

const StyledWrapper = styled.div`
  padding: 0 20px;
  position: relative;
  max-width: 1000px;
`;

const StyledIconLeft = styled.div`
  position: absolute;
  top: 0;
  left: -30px;
  height: 100%;
  width: 120px;
  font-size: 1.5rem;
  color: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background: linear-gradient(90deg, #f6f4f3 40%, transparent);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const StyledTabsBox = styled.ul`
  display: flex;
  gap: 12px;
  list-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  margin-right: 30px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTab = styled.li`
  color: var(--color-secondary);
  cursor: pointer;
  font-size: 1rem;
  white-space: nowrap;
  background: var(--color-background);
  padding: 8px 10px;
  border: 1px solid var(--color-frame);
  border-radius: 8px;
  transition: background-color 0.3s ease;
  opacity: 70%;
  -webkit-tap-highlight-color: transparent;

  ${({ $isSelected, $color }) =>
    $isSelected &&
    css`
      background: ${$color};
      opacity: 100%;
    `}
`;

const StyledIconRight = styled.div`
  position: absolute;
  top: 0;
  right: -30px;
  height: 100%;
  width: 120px;
  font-size: 1.5rem;
  color: #313366;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-90deg, #f6f4f3 40%, transparent);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const StyledAppliedInfo = styled.p`
  margin: 0;
  padding: 10px 0 10px 20px;
  color: var(--color-secondary);
`;

const StyledClearFilter = styled.span`
  margin-left: 4px;
  cursor: pointer;
  color: #a6a6a6;
  position: relative;
  top: -6px;

  &:hover {
    color: var(--color-secondary);
  }
`;
