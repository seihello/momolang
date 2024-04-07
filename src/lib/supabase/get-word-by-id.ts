import createClient from "@/lib/supabase/client";
import Word from "@/types/word.type";

export default async function getWordById(wordId: number): Promise<Word> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("words")
      .select("*, sentences(content) ,word_categories(categories(*))")
      .eq("id", wordId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const sentences: string[] = data.sentences.map(
      (sentence: any) => sentence.content,
    );
    const categoryIds: number[] = data.word_categories.map(
      (category: any) => category.categories.id,
    );

    return { ...data, sentences, categoryIds };
  } catch (error) {
    throw error;
  }
}
