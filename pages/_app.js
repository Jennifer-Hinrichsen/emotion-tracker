import GlobalStyle from "../styles";
import { initialEmotionEntries } from "@/lib/initialEmotionEntries";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";
import ToastMessage from "@/components/ToastMessage";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [emotions, setEmotions] = useLocalStorageState("emotions", {
    defaultValue: initialEmotionEntries,
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
    setEmotions((prevEmotions) =>
      [{ id: uuidv4(), ...newEmotion }, ...prevEmotions].sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      )
    showToastMessage("Successfully added!");
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
    showToastMessage("Successfully edited!");
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
