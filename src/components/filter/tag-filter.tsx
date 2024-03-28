import tags from "@/def/tags";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaCheck } from "react-icons/fa6";

type Props = {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TagFilter({ selectedTags, setSelectedTags }: Props) {
  return (
    <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-[320px] cursor-pointer rounded-lg border bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm">
          {selectedTags.length > 0 ? (
            <span className="block truncate">{selectedTags.join(", ")}</span>
          ) : (
            <span className="text-gray-500">Select tags</span>
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
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-[320px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {tags.map((tag, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-primary-100 text-primary-900" : "text-gray-900"
                  }`
                }
                value={tag}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {tag}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-900">
                        <FaCheck />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
