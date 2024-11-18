import GlobalStyle from "../styles";
import { initialEmotionEntries } from "@/lib/initialEmotionEntries";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout";
import ToastMessage from "@/components/ToastMessage";
import { useState, useEffect } from "react";
import { emotionList } from "@/lib/emotionList";

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

  const [myBookmarkedEmotions, setMyBookmarkedEmotions] = useLocalStorageState(
    "myBookmarkedEmotions",
    {
      defaultValue: [""],
    }
  );

  // const [emotionTypes, setEmotionTypes] = useLocalStorageState("emotionTypes", {
  //   defaultValue: emotionList.map((emotion) => emotion.emotionType),
  // });
  const [emotionTypes, setEmotionTypes] = useLocalStorageState("emotionTypes", {
    defaultValue: emotionList, // Übernimm das gesamte emotionList-Array
  });

  function handleToggleBookmark(id) {
    setMyBookmarkedEmotions((prevBookmarks) =>
      prevBookmarks.includes(id)
        ? prevBookmarks.filter((bookmarkId) => bookmarkId !== id)
        : [...prevBookmarks, id]
    );
  }

  function handleCreateEmotion(newEmotion) {
    setEmotions((prevEmotions) =>
      [{ id: uuidv4(), ...newEmotion }, ...prevEmotions].sort(
        (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
      )
    );
    showToastMessage("Successfully added!");
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

  const existingEmotionTypes = [
    "Love",
    "Tired",
    "Annoyed",
    "Proud",
    "Hopeful",
    "Confident",
    "Excited",
    "Releived",
  ];
  function handleCreateEmotionType(newEmotionType) {
    const maxId = emotionTypes.reduce((max, emotion) => {
      const currentId = parseInt(emotion.id, 10) || 0;
      return currentId > max ? currentId : max;
    }, 0);

    const emotionWithId = {
      id: (maxId + 1).toString(),
      ...newEmotionType,
    };

    setEmotionTypes((prevTypes) => [...prevTypes, emotionWithId]);
    showToastMessage("Successfully added!");
    console.log("emotionTypes von app:", newEmotionType);
  }

  return (
    <>
      <GlobalStyle />

      <Layout>
        <Component
          emotions={emotions}
          onCreateEmotion={handleCreateEmotion}
          onDeleteEmotion={handleDeleteEmotion}
          onUpdateEmotion={handleUpdateEmotion}
          myBookmarkedEmotions={myBookmarkedEmotions}
          onToggleBookmark={handleToggleBookmark}
          onCreateEmotionType={handleCreateEmotionType}
          emotionTypes={emotionTypes}
          existingEmotionTypes={existingEmotionTypes}
          {...pageProps}
        />
        {toasts.map((toast) => (
          <ToastMessage
            key={toast.id}
            message={toast.message}
            visible={toast.visible}
          />
        ))}
      </Layout>
    </>
  );
}
