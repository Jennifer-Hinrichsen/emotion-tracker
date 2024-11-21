import Calendar from "@/components/Calendar";
import Heading from "@/components/Heading";
import styled from "styled-components";

export default function CalendarPage({ emotions }) {
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
