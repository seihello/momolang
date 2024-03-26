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

  const getColor = (level: number | undefined) => {
    switch (level) {
      case 1:
        return "bg-red-50";
      case 2:
        return "bg-yellow-50";
      case 3:
        return "bg-lime-50";
      case 4:
        return "bg-blue-50";
      case 5:
        return "bg-violet-50";
      default:
        return "bg-white";
    }
  };

  const getTdElement = (content: number | string | string[] | undefined) => {
    return (
      <td
        className="border border-gray-300 p-1 align-text-top"
        dangerouslySetInnerHTML={{
          __html: content
            ? typeof content === "object"
              ? content.join("<br />")
              : content
            : "",
        }}
      />
    );
  };

  return (
    <div className="px-2">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Meaning</th>
            <th>Sentence</th>
            <th>Collocation</th>
            <th className="min-w-28">Tag</th>
            <th className="min-w-16">Level</th>
            <th className="min-w-28">Pronunciation</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={index} className={getColor(word.level)}>
              {getTdElement(word.id)}
              {getTdElement(word.titles)}
              {getTdElement(word.meanings)}
              {getTdElement(word.sentences)}
              {getTdElement(word.collocations)}
              {getTdElement(word.tags)}
              {getTdElement(word.level)}
              {getTdElement(word.pronunciations)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
