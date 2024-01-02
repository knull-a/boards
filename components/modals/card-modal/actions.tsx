import { copyCard } from "@/actions/copy-card";
import { CardWithList } from "@/actions/create-card/types";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { onClose } from "@/lib/redux/slices/modalSlice";
import { AppDispatch } from "@/lib/redux/store";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type CardModalActionsProps = {
  card: CardWithList;
};

export default function CardModalActions({ card }: CardModalActionsProps) {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const closeCardModal = () => dispatch(onClose());

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
        closeCardModal();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" deleted`);
        closeCardModal();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.id as string;

    executeCopyCard({
      id: card.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.id as string;

    executeDeleteCard({
      id: card.id,
      boardId,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Button variant="gray" onClick={onCopy}>
        <Copy className="w-4 h-4 mr-2" />
        Copy
      </Button>
      <Button variant="gray" onClick={onDelete}>
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
}
