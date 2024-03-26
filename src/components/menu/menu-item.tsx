import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type Props = {
  title: string;
  link: string;
  icon: JSX.Element;
};

export default function MenuItem({ title, link, icon }: Props) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={link}
            className="flex h-12 w-12 items-center justify-center rounded-md text-xl text-primary-900 hover:bg-primary-100"
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-900/80 text-white">
          <p className="font-normal text-gray-100">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
