import createClient from "@/lib/supabase/client";
import Word from "@/types/word.type";

export default async function getAllWords(): Promise<Word[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("words")
      .select("*, word_sentences(content) ,word_categories(category_id)")
      .order("id", { ascending: true });

    console.log("data", data);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
