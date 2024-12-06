import Heading from "@/components/Heading";
import StatisticBubble from "@/components/StatisticBubble";
import useSWR from "swr";

export default function StatisticPage() {
  const { data: emotions, isLoading } = useSWR("/api/emotionEntries");
  const { data: emotionTypes, isLoading: isLoadingTypes } =
    useSWR("/api/emotionTypes");

  if (isLoading || isLoadingTypes) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Heading>My Statistic</Heading>
      <StatisticBubble emotions={emotions} emotionTypes={emotionTypes} />
    </>
  );
}
