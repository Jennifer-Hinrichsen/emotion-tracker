import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import { useState } from "react";
import ToastMessage from "@/components/ToastMessage";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [myBookmarkedEmotions, setMyBookmarkedEmotions] = useLocalStorageState(
    "myBookmarkedEmotions",
    {
      defaultValue: [""],
    }
  );
  const [toast, setToast] = useState({ visible: "", message: "" });

  function handleToggleBookmark(id) {
    setMyBookmarkedEmotions((prevBookmarks) =>
      prevBookmarks.includes(id)
        ? prevBookmarks.filter((bookmarkId) => bookmarkId !== id)
        : [...prevBookmarks, id]
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);

    inputData.intensity = selectedIntensity;

    if (!inputData.type) {
      setFormError("Please choose an emotion type.");
      return;
    }

    function handleToastMessage(toastData) {
      setToast(toastData);
    }
    useEffect(() => {
      if (toast.visible === "enter") {
        const timer = setTimeout(() => {
          setToast({ visible: "leave", message: "" });
        }, 3000); // Timeout nach 3 Sekunden

        return () => clearTimeout(timer); // Aufräumen beim Entfernen des Toasts
      }
    }, [toast.visible]);
  }

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          <Component
            myBookmarkedEmotions={myBookmarkedEmotions}
            onToggleBookmark={handleToggleBookmark}
            onToastMessage={handleToastMessage}
            onSubmit={handleSubmit}
            {...pageProps}
          />
        </SWRConfig>

        <ToastMessage
          visible={toast.visible ? "enter" : "leave"}
          message={toast.message}
        />
      </Layout>
    </>
  );
}
