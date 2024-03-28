import Filter from "@/components/filter/filter";

type Props = {
  title: string;
  options?: string[];
  selectedItems?: string[];
  setSelectedItems?: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function WordTableHeader({
  title,
  options,
  selectedItems,
  setSelectedItems,
}: Props) {
  return (
    <th className="w-auto">
      {options && selectedItems && setSelectedItems ? (
        <Filter
          title={title}
          options={options}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ) : (
        <>{title}</>
      )}
    </th>
  );
}
