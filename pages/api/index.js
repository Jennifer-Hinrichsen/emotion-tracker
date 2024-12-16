import useSWR from "swr";
import Journal from "@/components/JournalForm";
import Heading from "@/components/Heading";
import styled from "styled-components";

export default function JournalPage() {
  const { data: emotions, error, isLoading } = useSWR("/api/emotionEntries");
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error || !emotions) {
    return <h1>Error loading emotion entries: {error.message}</h1>;
  }

  return (
    <div>
      <Heading>My Journal</Heading>
      <StyledList>
        {emotions.length > 0 ? (
          emotions.map((emotion) => (
            <Journal key={emotion._id} emotion={emotion} />
          ))
        ) : (
          <StyledMessage>No emotions found in your journal.</StyledMessage>
        )}
      </StyledList>
    </div>
  );
}

const StyledList = styled.ul`
  margin-bottom: 48px;
  padding: 0 1rem;
`;

const StyledMessage = styled.p`
  color: var(--color-form-foreground);

  body.dark-theme & {
    color: var(--color-form-foreground);
  }
`;
