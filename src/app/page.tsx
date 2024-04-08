"use client";
import BackForwardMenu from "@/components/home/back-forward-menu";
import getAllWordInfo from "@/lib/supabase/get-all-word-info";
import getCategories from "@/lib/supabase/get-categories";
import getWordById from "@/lib/supabase/get-word-by-id";
import WordInfo from "@/types/word-info.type";

import Word from "@/types/word.type";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [wordInfoList, setWordInfoList] = useState<WordInfo[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Map<number, string>>(new Map());
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const setNewWord = useCallback(async () => {
    if (wordInfoList.length > 0) {
      const index = Math.floor(Math.random() * wordInfoList.length);
      const word = await getWordById(wordInfoList[index].id);
      setWords((prev) => [...prev, word]);
    }
  }, [wordInfoList]);

  useEffect(() => {
    const run = async () => {
      try {
        const categories = await getCategories();
        const categoryOptions = new Map<number, string>();
        categories.forEach((category) => {
          categoryOptions.set(category.id, category.title);
        });
        setCategories(categoryOptions);

        const wordInfoList = await getAllWordInfo();
        setWordInfoList(wordInfoList);
      } catch (error) {
        console.error(error);
      }
    };
    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (isLoading || words.length > 0) return;
      try {
        setIsLoading(true);
        await setNewWord();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [setNewWord, isLoading, words]);

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

  if (
    categories.size === 0 ||
    words.length === 0 ||
    currentIndex >= words.length
  )
    return;

  const currentWord = words[currentIndex];

  return (
    <div className="flex flex-col px-24">
      <div
        className="text-2xl text-main-700"
        dangerouslySetInnerHTML={{
          __html: currentWord.title,
        }}
      />
      {currentWord.meaning && (
        <div
          className="text-lg text-gray-700"
          dangerouslySetInnerHTML={{
            __html: currentWord.meaning,
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
      {currentWord.categoryIds && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {currentWord.categoryIds.map((categoryId: number, index: number) => (
            <div
              key={index}
              className="flex min-w-16 justify-center rounded-full border border-red-500 bg-red-50 px-2 py-1 text-sm text-red-700"
            >
              {categories.get(categoryId)}
            </div>
          ))}
        </div>
      )}
      <BackForwardMenu
        toNext={toNext}
        toPrevious={toPrevious}
        isFirst={currentIndex === 0}
        isLast={currentIndex === wordInfoList.length - 1}
      />
    </div>
  );
}
