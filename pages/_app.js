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
  const [toasts, setToasts] = useState([]);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  function showToastMessage(message) {
    if (isInitialLoad) return;

    const newToast = {
      message: <strong>{message}</strong>,
      id: uuidv4(),
      visible: "enter",
    };

    setToasts((prevToasts) => {
      const updatedToasts = [...prevToasts, newToast];
      return updatedToasts.length > 3 ? updatedToasts.slice(1) : updatedToasts;
    });

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === newToast.id ? { ...toast, visible: "exit" } : toast
        )
      );
    }, 3000);

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id)
      );
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
    showToastMessage("Successfully edited!");
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
      {toasts.map((toast) => (
        <ToastMessage
          key={toast.id}
          message={toast.message}
          visible={toast.visible}
        />
      ))}
    </>
  );
}
