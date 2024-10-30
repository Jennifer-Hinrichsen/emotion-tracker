import Heading from "@/components/Heading";
import EmotionForm from "@/components/EmotionForm";
import EmotionList from "@/components/EmotionList";
import Image from "next/image";
import styled from "styled-components";

export default function HomePage({ emotions, onCreateEmotion }) {
  return (
    <div>
      <Heading>Mood Wave</Heading>
      <ImageWrapper>
        <Image
          src="/images/logo-final.svg"
          alt="Mood Wave"
          width={50}
          height={50}
        />
      </ImageWrapper>
      <EmotionForm emotions={emotions} onSubmit={onCreateEmotion} />
      <EmotionList emotions={emotions} />
    </div>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;
