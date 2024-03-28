"use client";
import WordTableData from "@/components/words/word-table-data";
import WordTableHeader from "@/components/words/word-table-header";
import tags from "@/def/tags";
import getAllWords from "@/lib/supabase/get-all-words";
import Word from "@/types/word.type";
import { useCallback, useEffect, useState } from "react";

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [isLoadingWords, setIsLoadingWords] = useState<boolean>(true);

  useEffect(() => {
    const run = async () => {
      try {
        const words1 = await getAllWords(0, 999);
        const words2 = await getAllWords(1000, 1999);
        const words3 = await getAllWords(2000, 2999);
        setWords([...words1, ...words2, ...words3]);
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

  const filteredWords = words.filter((word: Word) => {
    return (
      (selectedTags.length === 0 ||
        word.tags?.some((tag) => selectedTags.includes(tag))) &&
      (selectedLevels.length === 0 ||
        (word.level !== undefined &&
          selectedLevels.includes(word.level?.toString())))
    );
  });

  const compareLevel = useCallback((a: any, b: any) => {
    if (a.level && b.level) {
      return a.level < b.level ? -1 : 1;
    } else if (!a.level && !b.level) {
      return 0;
    } else if (!a.level) {
      return 1;
    } else if (!b.level) {
      return -1;
    } else {
      return 0;
    }
  }, []);

  if (isLoadingWords) return;

  return (
    <div className="px-2">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <WordTableHeader title="ID" width={48} />
            <WordTableHeader title="Title" width={320} />
            <WordTableHeader title="Meaning" width={256} />
            <WordTableHeader title="Sentence" />
            <WordTableHeader title="Collocation" width={128} />
            <WordTableHeader
              title="Tag"
              options={tags}
              selectedItems={selectedTags}
              setSelectedItems={setSelectedTags}
              width={128}
            />
            <WordTableHeader
              title="Level"
              options={["0", "1", "2", "3", "4", "5"]}
              selectedItems={selectedLevels}
              setSelectedItems={setSelectedLevels}
              compare={compareLevel}
              setItems={setWords}
              width={96}
            />
            <WordTableHeader title="Pronunciation" width={128} />
          </tr>
        </thead>
        <tbody>
          {filteredWords.map((word, index) => (
            <tr key={index} className={getColor(word.level)}>
              <WordTableData content={word.id} />
              <WordTableData content={word.titles} />
              <WordTableData content={word.meanings} />
              <WordTableData content={word.sentences} />
              <WordTableData content={word.collocations} />
              <WordTableData content={word.tags} />
              <WordTableData content={word.level} />
              <WordTableData content={word.pronunciations} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
