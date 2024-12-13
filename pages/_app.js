import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import dynamic from "next/dynamic";

const fetcher = (url) => fetch(url).then((response) => response.json());

const SpinningDots = dynamic(() => import("@/components/SpinningDots"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
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

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          <SpinningDots />
          <Component
            myBookmarkedEmotions={myBookmarkedEmotions}
            onToggleBookmark={handleToggleBookmark}
            {...pageProps}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}
