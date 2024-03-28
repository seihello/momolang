import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaCheck, FaSort } from "react-icons/fa6";

type Props = {
  title: string;
  options: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Filter({
  title,
  options,
  selectedItems,
  setSelectedItems,
}: Props) {
  return (
    <Listbox value={selectedItems} onChange={setSelectedItems} multiple>
      <Listbox.Button className="relative flex h-full w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300">
        <span className="block truncate">{title}</span>
        <FaSort />
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {options.map((option, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-10 text-left ${
                  active ? "bg-primary-100 text-primary-900" : "text-gray-900"
                }`
              }
              value={option}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option}
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
    </Listbox>
  );
}
