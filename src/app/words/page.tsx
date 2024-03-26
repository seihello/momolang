"use client";

import getAllWords from "@/lib/supabase/get-all-words";
import Word from "@/types/word.type";
import { useEffect, useState } from "react";

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoadingWords, setIsLoadingWords] = useState<boolean>(true);

  useEffect(() => {
    const run = async () => {
      try {
        const words = await getAllWords();
        setWords(words);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingWords(false);
      }
    };
    run();
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-primary-900"></main>
  );
}
