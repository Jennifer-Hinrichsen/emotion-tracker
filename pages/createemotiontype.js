import CreateEmotionTypeForm from "@/components/CreateEmotionTypeForm";
import Heading from "@/components/Heading";

export default function CreateEmotionType({
  onCreateEmotionType,
  customEmotionTypes,
}) {
  return (
    <>
      <Heading>Create Emotion Type</Heading>
      <CreateEmotionTypeForm
        customEmotionTypes={customEmotionTypes}
        onSubmit={onCreateEmotionType}
      />
    </>
  );
}
