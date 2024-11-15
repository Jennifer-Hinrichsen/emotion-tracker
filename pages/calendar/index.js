import Calendar from "@/components/Calendar";
import Heading from "@/components/Heading";
import styled from "styled-components";

export default function CalendarPage({ emotions }) {
  const createdEmotions = emotions.filter((emotion) => emotion.id);

  return (
    <>
      <Heading>My Calendar</Heading>
      <Calendar emotions={createdEmotions} />
    </>
  );
}

const StyledList = styled.ul`
  margin-bottom: 48px;
  padding: 0 1rem;
`;
