import GlobalStyle from "../styles";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout";
import ToastMessage from "@/components/ToastMessage";
import { useState, useEffect } from "react";
import { initialEmotionTypes } from "@/lib/initialEmotionTypes";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [toasts, setToasts] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [emotions, setEmotions] = useState([]);
  const [customEmotionTypes, setCustomEmotionTypes] = useLocalStorageState(
    "emotionTypes",
    {
      defaultValue: initialEmotionTypes,
    }
  );

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);
  const [myBookmarkedEmotions, setMyBookmarkedEmotions] = useLocalStorageState(
    "myBookmarkedEmotions",
    {
      defaultValue: [""],
    }
  );

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
      prevEmotions.filter((emotion) => emotion._id !== id)
    );
  }

  function handleUpdateEmotion(updatedEmotion) {
    const updatedEmotions = emotions.map((emotion) =>
      emotion._id === updatedEmotion._id ? updatedEmotion : emotion
    );
    const sortedEmotions = updatedEmotions.sort(
      (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
    );
    setEmotions(sortedEmotions);
    showToastMessage("Successfully edited!");
  }

  function handleCreateEmotionType(newEmotionType) {
    const emotionWithId = {
      id: uuidv4(),
      ...newEmotionType,
    };
    setCustomEmotionTypes((prevTypes) => [...prevTypes, emotionWithId]);
    showToastMessage("Successfully added!");
    router.push({
      pathname: "/",
      query: {
        showForm: "true",
        selectedEmotionType: newEmotionType.emotionType,
      },
    });
  }

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          <Component
            emotions={emotions}
            onCreateEmotion={handleCreateEmotion}
            onDeleteEmotion={handleDeleteEmotion}
            onUpdateEmotion={handleUpdateEmotion}
            myBookmarkedEmotions={myBookmarkedEmotions}
            onToggleBookmark={handleToggleBookmark}
            onCreateEmotionType={handleCreateEmotionType}
            customEmotionTypes={customEmotionTypes}
            {...pageProps}
          />
          {toasts.map((toast) => (
            <ToastMessage
              key={toast._id}
              message={toast.message}
              visible={toast.visible}
            />
          ))}
        </SWRConfig>
      </Layout>
    </>
  );
}
