import GlobalStyle from "../styles";
import { useState } from "react";
import { initialEntries } from "@/lib/entries";
import { v4 as uuidv4 } from "uuid";

export default function App({ Component, pageProps }) {
  const [entries, setEntries] = useState(initialEntries);

  function handleCreateEmotion(newEmotion) {
    setEntries((prevEntries) => [
      { id: uuidv4(), ...newEmotion },
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
