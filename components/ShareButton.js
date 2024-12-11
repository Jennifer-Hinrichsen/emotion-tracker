import styled from "styled-components";

export default function ShareButton({ emotion }) {
  async function handleShare() {
    const shareData = {
      title: "Emotion Card",
      text: `I'm feeling ${emotion.type.name} with intensity ${
        emotion.intensity
      }. Note: ${emotion.notes || ""}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Sharing is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share. Please try again.");
    }
  }

  return (
    <StyledButtonShare type="button" onClick={handleShare}>
      Share
    </StyledButtonShare>
  );
}

const StyledButtonShare = styled.button`
  float: right;
  margin-right: 20px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #27ae60;
  }
`;
