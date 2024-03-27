import createClient from "@/lib/supabase/client";

export default async function getWordCount(): Promise<number> {
  const supabase = createClient();
  try {
    const { count, error } = await supabase
      .from("my_words")
      .select("*", { count: "exact", head: true });

    if (error) {
      throw new Error(error.message);
    }

    if (!count) {
      throw new Error("Words not found");
    }

    return count;
  } catch (error) {
    throw error;
  }
}
