import GlobalStyle from "../styles";
import { useState } from "react";
import { initialEntries } from "@/lib/entries";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
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
