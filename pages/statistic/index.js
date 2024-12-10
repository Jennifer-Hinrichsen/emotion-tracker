import Heading from "@/components/Heading";
import StatisticFilter from "@/components/statistic/StatisticFilter";
import useSWR from "swr";
import StatisticList from "@/components/statistic/StatisticList";
import { useState } from "react";

export default function StatisticPage() {
  const { data: emotions, isLoading } = useSWR("/api/emotionEntries");
  const { data: emotionTypes, isLoading: isLoadingTypes } =
    useSWR("/api/emotionTypes");

  // const currentMonth = new Date().toISOString().slice(0, 7);
  // const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  if (isLoading || isLoadingTypes) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Heading>My Statistic</Heading>
      <StatisticFilter
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <StatisticList
        emotions={emotions}
        emotionTypes={emotionTypes}
        // selectedMonth={selectedMonth}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
}
