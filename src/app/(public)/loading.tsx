"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const fullWord = "Loading...";
  const [loadingWord, setLoadingWord] = useState<string>(fullWord);

  useEffect(() => {
    async function BuildWord() {
      while (true) {
        await sleep(750);
        setLoadingWord("");
        for (const letter of fullWord) {
          setLoadingWord((prev) => (prev += letter));
          await sleep(300);
        }
      }
    }
    void BuildWord();
  }, []);
  return (
    <>
      <div className="mx-auto my-32 mb-10 w-1/4 rounded-md border border-blue-600 bg-slate-700 bg-opacity-40 p-5 text-center font-mono text-lg shadow-md shadow-black">
        {loadingWord}
      </div>
    </>
  );
}
