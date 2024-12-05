export default function StatisticBubble({ emotionTypes }) {
  console.log(emotionTypes);

  return (
    <>
      <ul>
        {emotionTypes.map((emotion) => (
          <li key={emotion._id}>
            <p>
              You felt <strong>{emotion.type.name}</strong> xx times, with an
              average intensity classified as xxx.
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
