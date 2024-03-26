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

  return (
    <div className="px-2">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-white">
            <th className="border border-gray-300">ID</th>
            <th className="border border-gray-300">Title</th>
            <th className="border border-gray-300">Meaning</th>
            <th className="border border-gray-300">Sentence</th>
            <th className="border border-gray-300">Collocation</th>
            <th className="min-w-28 border border-gray-300">Tag</th>
            <th className="min-w-16 border border-gray-300">Level</th>
            <th className="min-w-28 border border-gray-300">Pronunciation</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word, index) => (
            <tr key={index} className={getColor(word.level)}>
              <td className="border border-gray-300 p-1">{word.id}</td>
              <td className="border border-gray-300 p-1">
                {word.titles ? word.titles.join("\n") : ""}
              </td>
              <td className="border border-gray-300 p-1">
                {word.meanings ? word.meanings.join("\n") : ""}
              </td>
              <td className="border border-gray-300 p-1">
                {word.sentences ? word.sentences.join("\n") : ""}
              </td>
              <td className="border border-gray-300 p-1">
                {word.collocations ? word.collocations.join("\n") : ""}
              </td>
              <td className="border border-gray-300 p-1">
                {word.tags ? word.tags.join("\n") : ""}
              </td>
              <td className="border border-gray-300 p-1">{word.level}</td>
              <td className="border border-gray-300 p-1">
                {word.pronunciations ? word.pronunciations.join("\n") : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
