import FilterAndSort from "@/components/filter/filter-and-sort";
import FilterOption from "@/types/filter-option.type";

type Props = {
  title: string;
  options?: FilterOption[];
  selectedItems?: number[];
  setSelectedItems?: React.Dispatch<React.SetStateAction<number[]>>;
  compare?: (a: any, b: any) => number;
  setItems?: React.Dispatch<React.SetStateAction<any[]>>;
  width?: number;
};

export default function WordTableHeader({
  title,
  options,
  selectedItems,
  setSelectedItems,
  compare,
  setItems,
  width,
}: Props) {
  return (
    <th
      className="border border-gray-300"
      style={{
        width: width || "auto",
      }}
    >
      {(options && selectedItems && setSelectedItems) ||
      (compare && setItems) ? (
        <FilterAndSort
          title={title}
          options={options}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          compare={compare}
          setItems={setItems}
        />
      ) : (
        <>{title}</>
      )}
    </th>
  );
}
