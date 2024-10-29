import GlobalStyle from "../styles";
import { initialEmotionEntries } from "@/lib/initialEmotionEntries";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [emotions, setEmotions] = useLocalStorageState("emotions", {
    defaultValue: initialEmotionEntries,
  });

  function handleCreateEmotion(newEmotion) {
    setEmotions((prevObjects) => [
      { id: uuidv4(), ...newEmotion },
      ...prevObjects,
    ]);
  }
  function handleDeleteEmotion(id) {
    setEmotions((prevObjects) =>
      prevObjects.filter((object) => object.id !== id)
    );
  }

  function handleUpdateEmotion(updatedEmotion) {
    const updatedObjects = emotions.map((object) =>
      object.id === updatedEmotion.id ? updatedEmotion : object
    );
    const sortedObjects = updatedObjects.sort(
      (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    );
    setEmotions(sortedObjects);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        objects={emotions}
        onCreateEmotion={handleCreateEmotion}
        onDeleteEmotion={handleDeleteEmotion}
        onUpdateEmotion={handleUpdateEmotion}
        {...pageProps}
      />
    </>
  );
}
