import CreateEmotionTypeForm from "@/components/CreateEmotionTypeForm";
import Heading from "@/components/Heading";
import { useRouter } from "next/router";

export default function CreateEmotionType({ onCreateEmotionType }) {
  const router = useRouter();

  return (
    <>
      <Heading>Create Emotion Type</Heading>
      <CreateEmotionTypeForm
        onSubmit={() => {
          onCreateEmotionType;
          router.push("/");
        }}
      />
    </>
  );
}
