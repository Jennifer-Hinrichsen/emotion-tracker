import Heading from "@/components/Heading";
import StatisticBubble from "@/components/StatisticBubble";
import StatisticCircle from "@/components/StatisticCircles";
import styled from "styled-components";
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
      <StyledDiv>
        {/* <StatisticCircle /> */}
        <StatisticBubble emotions={emotions} emotionTypes={emotionTypes} />
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled.div`
  display: flex;
`;
