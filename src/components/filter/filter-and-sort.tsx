import FilterOption from "@/types/filter-option.type";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { FaCheck, FaSort } from "react-icons/fa6";

enum SortType {
  None,
  Ascending,
  Descending,
}

type Props = {
  title: string;
  options?: FilterOption[];
  selectedItems?: number[];
  setSelectedItems?: React.Dispatch<React.SetStateAction<number[]>>;
  compare?: (a: any, b: any) => number;
  setItems?: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function FilterAndSort({
  title,
  options,
  selectedItems,
  setSelectedItems,
  compare,
  setItems,
}: Props) {
  const [sortType, setSortType] = useState<SortType>(SortType.None);

  useEffect(() => {
    const sort = async () => {
      if (compare && setItems) {
        if (sortType === SortType.Ascending) {
          setItems((prev) => {
            const newItems = [...prev];
            newItems.sort(compare);
            return newItems;
          });
        } else if (sortType === SortType.Descending) {
          setItems((prev) => {
            const newItems = [...prev];
            newItems.sort(compare);
            newItems.reverse();
            return newItems;
          });
        }
      }
    };
    sort();
  }, [sortType, compare, setItems]);

  // console.log("sortType", sortType);

  return (
    <Listbox value={selectedItems} onChange={setSelectedItems} multiple>
      <Listbox.Button className="relative flex h-full w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-main-300">
        <span className="block truncate">{title}</span>
        <FaSort />
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute z-10 mt-1 max-h-64 w-auto overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {compare && setItems && (
            <div className="flex items-stretch border-b">
              <button
                className={`flex flex-1 items-center justify-center rounded-none border-r py-2 ${sortType === SortType.Ascending ? "bg-gray-300" : ""}`}
                onClick={async () => {
                  setSortType(SortType.Ascending);
                }}
              >
                <FaSortAmountDownAlt />
              </button>
              <button
                className={`flex flex-1 items-center justify-center rounded-none py-2 ${sortType === SortType.Descending ? "bg-gray-300" : ""}`}
                onClick={async () => {
                  setSortType(SortType.Descending);
                }}
              >
                <FaSortAmountDown />
              </button>
            </div>
          )}
          {options &&
            selectedItems &&
            setSelectedItems &&
            options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-10 text-left ${
                    active ? "bg-main-100 text-main-900" : "text-gray-900"
                  }`
                }
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-main-900">
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
