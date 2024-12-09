import Heading from "@/components/Heading";
import StatisticFilter from "@/components/statistic/StatisticFilter";
import useSWR from "swr";
import StatisticList from "@/components/statistic/StatisticList";
import { useState } from "react";

export default function StatisticPage() {
  const { data: emotions, isLoading } = useSWR("/api/emotionEntries");
  const { data: emotionTypes, isLoading: isLoadingTypes } =
    useSWR("/api/emotionTypes");

  const currentMonth = new Date().toISOString().slice(0, 7);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  if (isLoading || isLoadingTypes) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Heading>My Statistic</Heading>
      <StatisticFilter
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <StatisticList
        emotions={emotions}
        emotionTypes={emotionTypes}
        selectedMonth={selectedMonth}
      />
    </>
  );
}
