import Link from "next/link";

type Props = {
  title: string;
  link: string;
  icon: JSX.Element;
};

export default function MenuItem({ title, link, icon }: Props) {
  return (
    <Link
      href={link}
      className="bg-primary-50 flex items-center gap-x-2 px-6 py-2 text-primary-900 hover:bg-primary-100"
    >
      {icon}
      <div>{title}</div>
    </Link>
  );
}
