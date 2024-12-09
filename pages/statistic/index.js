import Heading from "@/components/Heading";
import StatisticFilter from "@/components/statistic/StatisticFilter";
import useSWR from "swr";
import StatisticList from "@/components/statistic/StatisticList";

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
      <StatisticFilter />
      <StatisticList emotions={emotions} emotionTypes={emotionTypes} />
    </>
  );
}
