import createClient from "@/lib/supabase/client";
import Word from "@/types/word.type";

export default async function getWordById(id: number): Promise<Word> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("my_words")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
