import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import addWord from "@/lib/supabase/add-word";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
  meaning: z.string().min(1, { message: "Meaning cannot be empty." }),
  // ipa: z.string().optional(),
  sentences: z.string().array().optional(),
  // categoryIds: z.number().array().optional(),
});

export default function WordAddingForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      meaning: "",
      // ipa: "",
      sentences: Array(3),
      // categoryIds: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await addWord(values.title, values.meaning, "", values.sentences);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full flex-col gap-y-4"
      >
        <h2 className="text-center text-xl font-semibold">Contact Us</h2>
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className={fieldState.invalid ? "border-destructive" : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meaning"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Meaning</FormLabel>
              <FormControl>
                <Textarea
                  className={fieldState.invalid ? "border-destructive" : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Meaning</FormLabel>
          {form.getValues("sentences").map((sentence, index) => (
            <FormField
              key={index}
              control={form.control}
              name="meaning"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className={fieldState.invalid ? "border-destructive" : ""}
                      onChange={(e) => {
                        const newSentences = [...form.getValues("sentences")];
                        newSentences[index] = e.target.value;
                        form.setValue("sentences", newSentences);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit" disabled={!form.formState.isValid}>
          Send
        </Button>
      </form>
    </Form>
  );
}
