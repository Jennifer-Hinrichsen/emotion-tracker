import styled from "styled-components";

export default function AboutPage() {
  return (
    <StyledContainer>
      <h1>About</h1>
      <p>Creators:</p>
      <ul>
        <li>Jennifer Hinrichsen</li>
        <li>Stephie Tack</li>
        <li>Wladimir Schkulov</li>
        <li>Leon Fricke-Kleefisch</li>
      </ul>
      <p>Additional Information:</p>
      <article>
        <p>
          Mood Wave is an emotion tracker designed to help users track, analyze
          and understand their feelings over time. While especially beneficial
          for individuals attending behavioral therapy, it’s also perfect for
          anyone seeking deeper self-awareness.
        </p>
        <p>
          The app offers creating new emotions, journaling, calendar tracking,
          detailed analytics and options to upload your own images. To make the
          experience even more personal, Mood Wave features a cozy, welcoming
          design with customizable wave-emojis to match your mood.
        </p>
      </article>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  color: var(--color-secondary);
`;
