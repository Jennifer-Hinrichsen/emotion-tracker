import Heading from "@/components/Heading";
import StatisticBubble from "@/components/StatisticBubble";
import useSWR from "swr";

export default function StatisticPage() {
  const { data: emotionTypes } = useSWR("/api/emotionTypes");

  return (
    <>
      <Heading>My Statistic</Heading>
      <StatisticBubble emotionTypes={emotionTypes} />
    </>
  );
}
