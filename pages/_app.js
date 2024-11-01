import GlobalStyle from "../styles";
import { initialEmotionEntries } from "@/lib/initialEmotionEntries";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [emotions, setEmotions] = useLocalStorageState("emotions", {
    defaultValue: initialEmotionEntries,
  });

  function handleCreateEmotion(newEmotion) {
    setEmotions((prevEmotions) =>
      [{ id: uuidv4(), ...newEmotion }, ...prevEmotions].sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      )
    );
  }
  function handleDeleteEmotion(id) {
    setEmotions((prevEmotions) =>
      prevEmotions.filter((emotion) => emotion.id !== id)
    );
  }

  function handleUpdateEmotion(updatedEmotion) {
    const updatedEmotions = emotions.map((emotion) =>
      emotion.id === updatedEmotion.id ? updatedEmotion : emotion
    );
    const sortedEmotions = updatedEmotions.sort(
      (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    );
    setEmotions(sortedEmotions);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        emotions={emotions}
        onCreateEmotion={handleCreateEmotion}
        onDeleteEmotion={handleDeleteEmotion}
        onUpdateEmotion={handleUpdateEmotion}
        {...pageProps}
      />
    </>
  );
}
