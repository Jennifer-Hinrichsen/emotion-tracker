import Calendar from "@/components/Calendar";
import Heading from "@/components/Heading";
import styled from "styled-components";
import useSWR from "swr";

export default function CalendarPage() {
  const { data: emotions, error, isLoading } = useSWR("/api/emotionEntries");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !emotions) {
    return <h1>Error loading emotionEntries: {error.message}</h1>;
  }
  return (
    <>
      <Heading>My Calendar</Heading>
      <Calendar emotions={emotions} />
    </>
  );
}

const StyledList = styled.ul`
  margin-bottom: 48px;
  padding: 0 1rem;
`;
