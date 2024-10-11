import EmotionForm from "@/components/EmotionForm";
import Heading from "@/components/Heading";
import { useRouter } from "next/router";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Heading>Edit Emotion</Heading>
      <EmotionForm />
    </>
  );
}
