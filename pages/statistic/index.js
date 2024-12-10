import Heading from "@/components/Heading";
import StatisticFilter from "@/components/statistic/StatisticFilter";
import useSWR from "swr";
import StatisticList from "@/components/statistic/StatisticList";
import { useState } from "react";

export default function StatisticPage() {
  const { data: emotions, isLoading } = useSWR("/api/emotionEntries");
  const { data: emotionTypes, isLoading: isLoadingTypes } =
    useSWR("/api/emotionTypes");

  const [isCustomDatePickerOpen, setIsCustomDatePickerOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    start: null,
    end: null,
  });

  const filteredEmotions =
    customDateRange.start && customDateRange.end
      ? emotions.filter((emotion) => {
          const emotionDate = new Date(emotion.dateTime);
          return (
            emotionDate >= customDateRange.start &&
            emotionDate <= customDateRange.end
          );
        })
      : emotions;

  function handleCustomDateChange(dates) {
    if (Array.isArray(dates)) {
      let [start, end] = dates;

      if (end) {
        end = new Date(end);
        end.setHours(23, 59, 59, 999);
      }

      setCustomDateRange({ start, end });
      if (start && end) {
        setIsCustomDatePickerOpen(false);
      }
    }
  }

  function handleClearCustomDate() {
    setCustomDateRange({ start: null, end: null });
    setIsCustomDatePickerOpen(false);
  }

  function handleToggleCalendar() {
    setIsCustomDatePickerOpen(!isCustomDatePickerOpen);
  }

  if (isLoading || isLoadingTypes) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Heading>My Statistic</Heading>
      <StatisticFilter
        onCustomDateChange={handleCustomDateChange}
        onClearCustomDate={handleClearCustomDate}
        customDateRange={customDateRange}
        onToggleCalendar={handleToggleCalendar}
        isCustomDatePickerOpen={isCustomDatePickerOpen}
      />
      <StatisticList emotions={filteredEmotions} emotionTypes={emotionTypes} />
    </>
  );
}
