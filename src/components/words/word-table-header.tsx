import FilterAndSort from "@/components/filter/filter-and-sort";

type Props = {
  title: string;
  options?: string[];
  selectedItems?: string[];
  setSelectedItems?: React.Dispatch<React.SetStateAction<string[]>>;
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
