import GlobalStyle from "../styles";
import { useState } from "react";
import { initialEntries } from "@/lib/entries";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [entries, setEntries] = useLocalStorageState("entries", {
    defaultValue: initialEntries,
  });
  function handleCreateEmotion(newEmotion) {
    setEntries((prevEntries) => [
      { id: uuidv4(), ...newEmotion },
      ...prevEntries,
    ]);
  }
  function handleDeleteEmotion(id) {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  }
  return (
    <>
      <GlobalStyle />
      <Component
        entries={entries}
        onCreateEmotion={handleCreateEmotion}
        onDeleteEmotion={handleDeleteEmotion}
        {...pageProps}
      />
    </>
  );
}
