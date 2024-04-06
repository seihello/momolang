"use client";
import WordAddingForm from "@/components/words/word-adding-form";
import WordTableData from "@/components/words/word-table-data";
import WordTableHeader from "@/components/words/word-table-header";
import getAllWords from "@/lib/supabase/get-all-words";
import getCategories from "@/lib/supabase/get-categories";
import Category from "@/types/category.type";
import Word from "@/types/word.type";
import { useEffect, useMemo, useState } from "react";

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const run = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
        const words = await getAllWords();
        setWords(words);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, []);

  const filteredWords = useMemo(() => {
    return words.filter((word: Word) => {
      return (
        selectedCategoryIds.length === 0 ||
        word.categoryIds?.some((categoryId) =>
          selectedCategoryIds.includes(categoryId),
        )
      );
    });
  }, [words, selectedCategoryIds]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2">
      <WordAddingForm />
      {isLoading ? (
        <div className="flex w-1/3 flex-col items-center gap-y-2">
          <p className="text-lg">Loading Words...</p>
        </div>
      ) : (
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <WordTableHeader title="ID" width={48} />
              <WordTableHeader title="Title" width={320} />
              <WordTableHeader title="Meaning" width={256} />
              <WordTableHeader title="Sentence" />
              <WordTableHeader
                title="Category"
                options={categories.map((category) => {
                  return { id: category.id, label: category.title };
                })}
                selectedItems={selectedCategoryIds}
                setSelectedItems={setSelectedCategoryIds}
                width={128}
              />
              <WordTableHeader title="Pronunciation" width={128} />
            </tr>
          </thead>
          <tbody>
            {filteredWords.map((word, index) => (
              <tr key={index}>
                <WordTableData content={word.id} />
                <WordTableData content={word.title} />
                <WordTableData content={word.meaning} />
                <WordTableData content={word.sentences} />
                <WordTableData
                  content={word.categoryIds.map(
                    (categoryId) =>
                      categories.find((category) => category.id === categoryId)
                        .title,
                  )}
                />
                <WordTableData content={word.ipa} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
