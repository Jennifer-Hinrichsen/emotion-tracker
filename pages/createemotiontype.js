import CreateEmotionTypeForm from "@/components/CreateEmotionTypeForm";
import Heading from "@/components/Heading";

export default function CreateEmotionType({ customEmotionTypes }) {
  async function handleCreateEmotionType(data) {
    const response = await fetch("/api/emotionTypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("data", data);
  }

  return (
    <>
      <Heading>Create Emotion Type</Heading>
      <CreateEmotionTypeForm
        customEmotionTypes={customEmotionTypes}
        onSubmit={handleCreateEmotionType}
      />
    </>
  );
}
