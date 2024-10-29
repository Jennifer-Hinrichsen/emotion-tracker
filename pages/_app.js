import GlobalStyle from "../styles";
import { initialObjects } from "@/lib/initialObjects";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";
import ToastMessage from "@/components/ToastMessage";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [objects, setObjects] = useLocalStorageState("objects", {
    defaultValue: initialObjects,
  });
  const [toast, setToast] = useState({
    message: "",
    visible: false,
  });

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  function showToastMessage(message) {
    if (isInitialLoad) return;

    // Wrap the message in <strong> to make it bold
    const boldMessage = <strong>{message}</strong>;

    setToast({ message: boldMessage, visible: "enter" });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: "exit" }));
    }, 3000);

    setTimeout(() => {
      setToast({ message: "", visible: false });
    }, 3300);
  }

  function handleCreateEmotion(newEmotion) {
    setObjects((prevObjects) => [
      { id: uuidv4(), ...newEmotion },
      ...prevObjects,
    ]);
    showToastMessage("Successfully added!");
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
    showToastMessage("✅ Successfully edited!");
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
      {toast.visible && (
        <ToastMessage message={toast.message} visible={toast.visible} />
      )}
    </>
  );
}
