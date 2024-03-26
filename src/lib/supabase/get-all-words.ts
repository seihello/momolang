import createClient from "@/lib/supabase/client";
import Word from "@/types/word.type";

export default async function getAllWords(): Promise<Word[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("my_words")
      .select("*")
      .order("id", { ascending: true })
      .limit(100);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
