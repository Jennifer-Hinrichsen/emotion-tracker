import GlobalStyle from "../styles";
import { initialObjects } from "@/lib/initialObjects";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [objects, setObjects] = useLocalStorageState("objects", {
    defaultValue: initialObjects,
  });
  function handleCreateEmotion(newEmotion) {
    setObjects((prevObjects) => [
      { id: uuidv4(), ...newEmotion },
      ...prevObjects,
    ]);
  }
  function handleDeleteEmotion(id) {
    setObjects((prevObjects) =>
      prevObjects.filter((object) => object.id !== id)
    );
  }
  return (
    <>
      <GlobalStyle />
      <Component
        objects={objects}
        onCreateEmotion={handleCreateEmotion}
        onDeleteEmotion={handleDeleteEmotion}
        {...pageProps}
      />
    </>
  );
}
