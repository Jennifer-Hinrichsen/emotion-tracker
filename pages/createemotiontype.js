import CreateEmotionTypeForm from "@/components/CreateEmotionTypeForm";
import Heading from "@/components/Heading";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateEmotionType({
  onCreateEmotionType,
  emotionTypes,
}) {
  const [selectedEmotionType, setSelectedEmotionType] = useState("");
  const router = useRouter();

  const handleEmotionTypeSubmit = (formData) => {
    setSelectedEmotionType(formData.emotionType);
    router.push({
      pathname: "/",
      query: { showForm: "true", selectedEmotionType: formData.emotionType },
    });
  };

  return (
    <>
      <Heading>Create Emotion Type</Heading>
      <CreateEmotionTypeForm
        emotionTypes={emotionTypes}
        onSubmit={(data) => {
          onCreateEmotionType(data);
          handleEmotionTypeSubmit(data);
        }}
      />
    </>
  );
}
