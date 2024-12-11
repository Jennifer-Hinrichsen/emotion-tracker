import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import SpinningDots from "@/components/SpinningDots";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [myBookmarkedEmotions, setMyBookmarkedEmotions] = useLocalStorageState(
    "myBookmarkedEmotions",
    {
      defaultValue: [""],
    }
  );

  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  function handleToggleBookmark(id) {
    setMyBookmarkedEmotions((prevBookmarks) =>
      prevBookmarks.includes(id)
        ? prevBookmarks.filter((bookmarkId) => bookmarkId !== id)
        : [...prevBookmarks, id]
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationFinished(true); // Nach 3 Sekunden die Animation beenden
    }, 5000); // 3 Sekunden Animation

    return () => clearTimeout(timer); // Cleanup der Timeout-Referenz
  }, []);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          {/* Animation anzeigen, solange sie noch nicht vorbei ist */}
          {!isAnimationFinished ? (
            <SpinningDots />
          ) : (
            <Component
              myBookmarkedEmotions={myBookmarkedEmotions}
              onToggleBookmark={handleToggleBookmark}
              {...pageProps}
            />
          )}
        </SWRConfig>
      </Layout>
    </>
  );
}
