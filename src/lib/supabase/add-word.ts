import createClient from "@/lib/supabase/client";

export default async function addWord(
  title: string,
  meaning: string,
  ipa?: string,
  sentences?: string[],
  categoryIds?: number[],
  author?: string,
) {
  const supabase = createClient();
  try {
    const insertWordRes = await supabase
      .from("words")
      .insert({ title, meaning, ipa: ipa || null, author: author || null })
      .select("*")
      .single();

    if (insertWordRes.error) {
      throw new Error(insertWordRes.error.message);
    }

    if (insertWordRes.data.id) {
      if (sentences && sentences.length > 0) {
        for (const sentence of sentences) {
          const insertSentencesRes = await supabase
            .from("sentences")
            .insert({ word_id: insertWordRes.data.id, content: sentence });

          if (insertSentencesRes.error) {
            throw new Error(insertSentencesRes.error.message);
          }
        }
      }

      if (categoryIds && categoryIds.length > 0) {
        for (const categoryId of categoryIds) {
          const insertCategoriesRes = await supabase
            .from("word_categories")
            .insert({
              word_id: insertWordRes.data.id,
              category_id: categoryId,
            });

          if (insertCategoriesRes.error) {
            throw new Error(insertCategoriesRes.error.message);
          }
        }
      }
    }
  } catch (error) {
    throw error;
  }
}
