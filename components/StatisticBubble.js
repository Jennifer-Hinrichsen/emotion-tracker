import categorizeIntensity from "@/lib/categorizeIntensity";

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
      console.log(emotionType);
      return emotionType;
    })
    .toSorted(
      (emotionTypeA, emotionTypeB) => emotionTypeB.count - emotionTypeA.count
    );

  return (
    <>
      <ul>
        {filteredEmotionTypes.map((emotionType) => (
          <li key={emotionType._id}>
            <p>
              You felt <strong>{emotionType.name} </strong>
              {emotionType.count} times, with an average intensity of{" "}
              {emotionType.average}.
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
