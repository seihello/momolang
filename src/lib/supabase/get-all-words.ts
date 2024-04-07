import createClient from "@/lib/supabase/client";
import Word from "@/types/word.type";

export default async function getAllWords(): Promise<Word[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("words")
      .select("*, sentences(content) ,word_categories(categories(*))")
      .order("id", { ascending: true });

    const dataCopy = [...data];
    const words: Word[] = [];
    if (dataCopy) {
      for (const wordRow of dataCopy) {
        const sentences: string[] = wordRow.sentences.map(
          (sentence: any) => sentence.content,
        );
        const categoryIds: number[] = wordRow.word_categories.map(
          (category: any) => category.categories.id,
        );
        words.push({ ...wordRow, sentences, categoryIds });
      }
    }


    
    if (error) {
      throw new Error(error.message);
    }

    return words;
  } catch (error) {
    throw error;
  }
}
