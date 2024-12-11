import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import ToastMessage from "@/components/ToastMessage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Vergessen, uuid zu importieren

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [myBookmarkedEmotions, setMyBookmarkedEmotions] = useLocalStorageState(
    "myBookmarkedEmotions",
    {
      defaultValue: [""],
    }
  );
  const [toasts, setToasts] = useState([]);

  function handleToggleBookmark(id) {
    setMyBookmarkedEmotions((prevBookmarks) =>
      prevBookmarks.includes(id)
        ? prevBookmarks.filter((bookmarkId) => bookmarkId !== id)
        : [...prevBookmarks, id]
    );
  }

  function showToastMessage(message) {
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

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          <Component
            myBookmarkedEmotions={myBookmarkedEmotions}
            onToggleBookmark={handleToggleBookmark}
            showToastMessage={showToastMessage}
            {...pageProps}
          />
        </SWRConfig>
      </Layout>
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
