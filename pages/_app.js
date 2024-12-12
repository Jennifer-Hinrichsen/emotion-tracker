import { useRouter } from "next/router";
import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import SpinningDots from "@/components/SpinningDots";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [myBookmarkedEmotions, setMyBookmarkedEmotions] = useLocalStorageState(
    "myBookmarkedEmotions",
    {
      defaultValue: [""],
    }
  );

  // Initialzustand abhängig von der aktuellen Route
  const [isAnimationFinished, setIsAnimationFinished] = useState(
    router.pathname !== "/" // Animation nur auf der Startseite
  );

  function handleToggleBookmark(id) {
    setMyBookmarkedEmotions((prevBookmarks) =>
      prevBookmarks.includes(id)
        ? prevBookmarks.filter((bookmarkId) => bookmarkId !== id)
        : [...prevBookmarks, id]
    );
  }

  useEffect(() => {
    // Animation nur auf der Startseite starten
    if (router.pathname === "/") {
      const timer = setTimeout(() => {
        setIsAnimationFinished(true);
      }, 3200); // Dauer der Animation

      return () => clearTimeout(timer);
    }
  }, [router.pathname]);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          {isAnimationFinished ? (
            <Component
              myBookmarkedEmotions={myBookmarkedEmotions}
              onToggleBookmark={handleToggleBookmark}
              {...pageProps}
            />
          ) : (
            <SpinningDots />
          )}
        </SWRConfig>
      </Layout>
    </>
  );
}
