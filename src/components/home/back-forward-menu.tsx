import { Button } from "@/components/ui/button";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

type Props = {
  toNext: () => Promise<void>;
};

export default function BackForwardMenu({ toNext }: Props) {
  return (
    <div className="fixed bottom-12 right-12 flex items-center gap-x-8">
      <Button variant="ghost" className="p-0">
        <FaCircleArrowLeft className="size-16 text-sky-500" />
      </Button>
      <Button variant="ghost" className="p-0">
        <FaCircleArrowRight
          className="size-16 text-sky-500"
          onClick={() => toNext()}
        />
      </Button>
    </div>
  );
}
