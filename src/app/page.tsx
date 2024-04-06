"use client";
import BackForwardMenu from "@/components/home/back-forward-menu";

import Word from "@/types/word.type";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [wordCount, setWordCount] = useState<number>(0);
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setNewWord = useCallback(async () => {
    setIsLoading(true);
    const id = Math.floor(Math.random() * wordCount);
    const word = await getWordById(id);
    setWords([...words, word]);
    setIsLoading(false);
  }, [wordCount, words]);

  useEffect(() => {
    const run = async () => {
      try {
        const wordCount = await getWordCount();
        setWordCount(wordCount);
      } catch (error) {
        console.error(error);
      }
    };
    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!wordCount) return;
      try {
        await setNewWord();
      } catch (error) {
        console.error(error);
      }
    };
    run();
  }, [setNewWord, wordCount]);

  const toNext = async () => {
    if (currentIndex === words.length - 1) {
      await setNewWord();
    }
    setCurrentIndex(currentIndex + 1);
  };

  const toPrevious = async () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (words.length === 0 || currentIndex >= words.length) return;

  const currentWord = words[currentIndex];

  return (
    <div className="flex flex-col px-24">
      <div
        className="text-2xl text-main-700"
        dangerouslySetInnerHTML={{
          __html: currentWord.titles.join("<br />") || "",
        }}
      />
      {currentWord.meanings && (
        <div
          className="text-lg text-gray-700"
          dangerouslySetInnerHTML={{
            __html: currentWord.meanings.join("<br />") || "",
          }}
        />
      )}
      {currentWord.sentences && (
        <div
          className="mt-2 text-lg text-gray-900"
          dangerouslySetInnerHTML={{
            __html: currentWord.sentences.join("<br />") || "",
          }}
        />
      )}
      {currentWord.tags && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {currentWord.tags.map((tag: string, index: number) => (
            <div
              key={index}
              className="flex min-w-16 justify-center rounded-full border border-red-500 bg-red-50 px-2 py-1 text-sm text-red-700"
            >
              {tag}
            </div>
          ))}
        </div>
      )}
      <BackForwardMenu
        toNext={toNext}
        toPrevious={toPrevious}
        isFirst={currentIndex === 0}
      />
    </div>
  );
}
