import { PlusIcon } from "lucide-react";

export default function ListCardAdd() {
  return (
    <button className="flex items-center gap-2 pt-2 w-full text-black/60">
      <PlusIcon className="h-4 w-4" />
      Add a card
    </button>
  );
}
