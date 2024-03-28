import createClient from "@/lib/supabase/client";
import Word from "@/types/word.type";

export default async function getAllWords(
  rangeStart?: number,
  rangeEnd?: number,
): Promise<Word[]> {
  const supabase = createClient();

  try {
    if (rangeStart !== undefined && rangeEnd !== undefined) {
      const { data, error } = await supabase
        .from("my_words")
        .select("*")
        .order("id", { ascending: true })
        .range(rangeStart, rangeEnd);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } else {
      const { data, error } = await supabase
        .from("my_words")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }
  } catch (error) {
    throw error;
  }
}
