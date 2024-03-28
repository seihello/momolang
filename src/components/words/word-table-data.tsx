type Props = {
  content: number | string | string[] | undefined;
};

export default function WordTableData({ content }: Props) {
  return (
    <td
      className="border border-gray-300 p-1 align-text-top"
      dangerouslySetInnerHTML={{
        __html: content
          ? typeof content === "object"
            ? content.join("<br />")
            : content
          : "",
      }}
    />
  );
}
