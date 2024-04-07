"use client";
import { Button } from "@/components/ui/button";
import WordAddingForm from "@/components/words/word-adding-form";
import WordTableData from "@/components/words/word-table-data";
import WordTableHeader from "@/components/words/word-table-header";
import getAllWords from "@/lib/supabase/get-all-words";
import getCategories from "@/lib/supabase/get-categories";
import Word from "@/types/word.type";
import { useEffect, useMemo, useState } from "react";

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Map<number, string>>(new Map());
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const run = async () => {
      try {
        const categories = await getCategories();
        const categoryOptions = new Map<number, string>();
        categories.forEach((category) => {
          categoryOptions.set(category.id, category.title);
        });
        setCategories(categoryOptions);

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
    <div className="flex flex-1 flex-col items-stretch gap-y-4 px-2">
      <WordAddingForm
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        categories={categories}
      />
      <div className="flex justify-end">
        <Button onClick={() => setIsDialogOpen(true)}>Add new word</Button>
      </div>
      {isLoading ? (
        <div className="flex w-1/3 flex-col items-center gap-y-2">
          <p className="text-lg">Loading Words...</p>
        </div>
      ) : (
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <WordTableHeader title="Title" width={260} />
              <WordTableHeader title="Meaning" width={380} />
              <WordTableHeader title="Sentence" />
              <WordTableHeader
                title="Category"
                options={categories}
                selectedItems={selectedCategoryIds}
                setSelectedItems={setSelectedCategoryIds}
                width={128}
              />
              {/* <WordTableHeader title="Pronunciation" width={128} /> */}
            </tr>
          </thead>
          <tbody>
            {filteredWords.map((word, index) => (
              <tr key={index}>
                <WordTableData content={word.title} />
                <WordTableData content={word.meaning} />
                <WordTableData content={word.sentences} />
                <WordTableData
                  content={
                    word.categoryIds
                      ? word.categoryIds.map((categoryId) =>
                          categories.get(categoryId),
                        )
                      : []
                  }
                />
                {/* <WordTableData content={word.ipa} /> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
