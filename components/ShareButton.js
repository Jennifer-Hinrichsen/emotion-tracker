import styled from "styled-components";
import ShareIcon from "assets/optionsMenuIcons/share.svg";

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
    <StyledButtonShare
      type="button"
      onClick={handleShare}
      aria-label="Share this emotion"
    >
      <ShareIconStyled />
    </StyledButtonShare>
  );
}

const StyledButtonShare = styled.button`
  float: right;
  padding: 5px 10px;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0e4e99;
  }
`;
const ShareIconStyled = styled(ShareIcon)`
  width: 20px;
  height: 20px;
`;
