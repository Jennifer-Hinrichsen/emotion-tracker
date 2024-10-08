import GlobalStyle from "../styles";
import { useState } from "react";
import { initialEntries } from "@/lib/entries";

export default function App({ Component, pageProps }) {
  const [entries, setEntries] = useState(initialEntries);

  function handleCreateEmotion(newEmotion) {
    setEntries((prevEntries) => [
      { id: String(prevEntries.length + 1), ...newEmotion },
      ...prevEntries,
    ]);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        entries={entries}
        onCreateEmotion={handleCreateEmotion}
        {...pageProps}
      />
    </>
  );
}
