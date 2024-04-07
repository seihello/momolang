import createClient from "@/lib/supabase/client";
import WordInfo from "@/types/word-info.type";

export default async function getAllWordInfo(): Promise<WordInfo[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("words")
      .select("id, word_categories(categories(*))");

    const dataCopy = [...data];
    const wordInfoList: WordInfo[] = [];
    if (dataCopy) {
      for (const wordRow of dataCopy) {
        const categoryIds: number[] = wordRow.word_categories.map(
          (category: any) => category.categories.id,
        );
        wordInfoList.push({ ...wordRow, categoryIds });
      }
    }

    if (error) {
      throw new Error(error.message);
    }

    return wordInfoList;
  } catch (error) {
    throw error;
  }
}
