import { Button } from "@/components/ui/button";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

type Props = {
  toNext: () => Promise<void>;
  toPrevious: () => Promise<void>;
  isFirst: boolean;
};

export default function BackForwardMenu({
  toNext,
  toPrevious,
  isFirst,
}: Props) {
  return (
    <div className="fixed bottom-12 right-12 flex items-center gap-x-8">
      <Button
        variant="ghost"
        className="h-auto w-auto p-0"
        onClick={() => toPrevious()}
        disabled={isFirst}
      >
        <BsFillArrowLeftSquareFill
          className={`size-16 ${isFirst ? "text-gray-500" : "text-primary-900"}`}
        />
      </Button>
      <Button
        variant="ghost"
        className="h-auto w-auto p-0"
        onClick={() => toNext()}
      >
        <BsFillArrowRightSquareFill className="size-16 text-primary-900" />
      </Button>
    </div>
  );
}
