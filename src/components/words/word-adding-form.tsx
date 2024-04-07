import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { Listbox, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
  meaning: z.string().min(1, { message: "Meaning cannot be empty." }),
  // ipa: z.string().optional(),
  // sentences: z.string().array().optional(),
  // categoryIds: z.number().array().optional(),
});

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  categories: Map<number, string>;
};

export default function WordAddingForm({
  isOpen,
  setIsOpen,
  categories,
}: Props) {
  const [sentences, setSentences] = useState<string[]>(["", "", ""]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      meaning: "",
      // ipa: "",
      // sentences: ["", "", ""],
      // categoryIds: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await addWord(
        values.title,
        values.meaning,
        "",
        sentences,
        selectedCategoryIds,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="!max-w-[900px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-full flex-col gap-y-4"
          >
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

            <FormItem>
              <FormLabel>Sentences</FormLabel>
              <div className="flex flex-col gap-y-2">
                {sentences.map((sentence, index) => (
                  <Textarea
                    key={index}
                    value={sentence}
                    onChange={(e) => {
                      const newSentences = [...sentences];
                      newSentences[index] = e.target.value;
                      setSentences(newSentences);
                    }}
                  />
                ))}
              </div>
            </FormItem>

            <FormItem>
              <FormLabel>Categories</FormLabel>
              <Listbox
                value={selectedCategoryIds}
                onChange={setSelectedCategoryIds}
                multiple
              >
                <div className="relative mt-1">
                  <Listbox.Button className="focus-visible:ring-offset-primary-300 relative w-full cursor-pointer rounded-lg border bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
                    {selectedCategoryIds.length > 0 ? (
                      <span className="block truncate">
                        {selectedCategoryIds
                          .map((selectedPhaseId) =>
                            categories.get(selectedPhaseId),
                          )
                          .join(", ")}
                      </span>
                    ) : (
                      <span className="text-gray-500">Select categories</span>
                    )}
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {/* <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {Array.from(categories.entries()).map(
                        (phaseOption, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-primary-100 text-primary-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={phaseOption[0]}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {phaseOption[1]}
                                </span>
                                {selected ? (
                                  <span className="text-primary-900 absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaCheck />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ),
                      )}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </FormItem>

            <Button type="submit" disabled={!form.formState.isValid}>
              Add
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
