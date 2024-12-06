import categorizeIntensity from "@/lib/categorizeIntensity";
import styled from "styled-components";
import StatisticCircle from "./StatisticCircles";

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
    .toSorted((a, b) => b.count - a.count);

  return (
    <StyledList>
      {filteredEmotionTypes.map((emotionType) => (
        <StyledListItem key={emotionType._id}>
          <StatisticCircle
            count={emotionType.count}
            color={emotionType.color}
          />
          <p>
            You felt <strong>{emotionType.name} </strong>
            {emotionType.count} times, with an average intensity of{" "}
            {emotionType.average}.
          </p>
        </StyledListItem>
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem;
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
`;
