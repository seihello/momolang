import { Button } from "@/components/ui/button";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

type Props = {
  toNext: () => Promise<void>;
  toPrevious: () => Promise<void>;
};

export default function BackForwardMenu({ toNext, toPrevious }: Props) {
  return (
    <div className="fixed bottom-12 right-12 flex items-center gap-x-8">
      <Button
        variant="ghost"
        className="h-auto w-auto p-0"
        onClick={() => toPrevious()}
      >
        <FaCircleArrowLeft className="size-16 text-sky-500" />
      </Button>
      <Button
        variant="ghost"
        className="h-auto w-auto p-0"
        onClick={() => toNext()}
      >
        <FaCircleArrowRight className="size-16 text-sky-500" />
      </Button>
    </div>
  );
}
