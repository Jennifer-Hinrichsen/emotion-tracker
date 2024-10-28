import GlobalStyle from "../styles";
import { initialObjects } from "@/lib/initialObjects";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [objects, setObjects] = useLocalStorageState("objects", {
    defaultValue: initialObjects,
  });

  const [myBookmarkedEmotions, setMyBookmarkedEmotions] = useLocalStorageState(
    "myBookmarkedEmotions",
    {
      defaultValue: [""],
    }
  );

  function handleToggleBookmark(id) {
    setMyBookmarkedEmotions((prevBookmarks) =>
      prevBookmarks.includes(id)
        ? prevBookmarks.filter((bookmarkId) => bookmarkId !== id)
        : [...prevBookmarks, id]
    );
  }

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

  function handleUpdateEmotion(updatedEmotion) {
    const updatedObjects = objects.map((object) =>
      object.id === updatedEmotion.id ? updatedEmotion : object
    );
    const sortedObjects = updatedObjects.sort(
      (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    );
    setObjects(sortedObjects);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        objects={objects}
        onCreateEmotion={handleCreateEmotion}
        onDeleteEmotion={handleDeleteEmotion}
        onUpdateEmotion={handleUpdateEmotion}
        {...pageProps}
      />
    </>
  );
}
