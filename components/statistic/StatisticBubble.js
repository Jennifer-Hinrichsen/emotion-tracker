import categorizeIntensity from "@/lib/categorizeIntensity";
import styled from "styled-components";
import StatisticCircles from "./StatisticCircles";

export default function StatisticBubble({ emotions, emotionTypes }) {
  const typeStatisticData = emotions.reduce((acc, emotion) => {
    const id = emotion.type._id;
    if (!acc[id]) {
      acc[id] = { totalIntensity: 0, count: 0 };
    }
    acc[id].totalIntensity += emotion.intensity;
    acc[id].count += 1;
    return acc;
  }, {});

  const filteredEmotionTypes = emotionTypes
    .filter((emotionType) => typeStatisticData[emotionType._id] !== undefined)
    .map((emotionType) => {
      const typeData = typeStatisticData[emotionType._id];
      const average = Math.round(typeData.totalIntensity / typeData.count);

      emotionType.count = typeData.count;
      emotionType.average = categorizeIntensity(average);
      console.groupCollapsed(emotionType);
      return emotionType;
    })
    .toSorted((a, b) => {
      // Sortieren nach `count` (absteigend)
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      // Sortieren nach `average`-Intensität
      const intensityOrder = { High: 1, Medium: 2, Low: 3 };
      const aIntensityRank = intensityOrder[a.average];
      const bIntensityRank = intensityOrder[b.average];
      if (aIntensityRank !== bIntensityRank) {
        return aIntensityRank - bIntensityRank; // Niedrigere Werte stehen oben
      }
      // Sortieren nach `name` (alphabetisch)
      return a.name.localeCompare(b.name);
    });

  const maxCount = Math.max(
    ...filteredEmotionTypes.map(
      (filteredEmotionType) => filteredEmotionType.count
    )
  );

  return filteredEmotionTypes.length === 0 ? (
    <StyledMessage $isNoEntry>
      No entries found to create your emotion statistic.
    </StyledMessage>
  ) : (
    <StyledList>
      {filteredEmotionTypes.map((emotionType) => (
        <StyledListItem key={emotionType._id}>
          <StatisticCircles
            count={emotionType.count}
            color={emotionType.color}
            maxCount={maxCount}
          />
          <StyledMessage>
            You felt <strong>{emotionType.name} </strong>
            {emotionType.count} times, with an average intensity of{" "}
            {emotionType.average}.
          </StyledMessage>
        </StyledListItem>
      ))}
    </StyledList>
  );
}

const StyledMessage = styled.p`
  text-align: ${(props) => (props.$isNoEntry ? "center" : "left")};
  color: var(--color-secondary);
  font-size: 1.1rem;
  padding: 24px 16px;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem;
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
`;
