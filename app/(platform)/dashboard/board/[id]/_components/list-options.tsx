"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { PopoverClose } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

type ListOptionsProps = {
  list: List;
};

export default function ListOptions({ list }: ListOptionsProps) {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  async function onDelete(formData: FormData) {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    await executeDelete({ id, boardId });
    closeRef.current?.click();
  }

  async function onCopy(formData: FormData) {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    await executeCopy({ id, boardId });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-2 w-auto h-auto" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start">
        <PopoverClose className="absolute top-0 left-0" ref={closeRef} />
        <form action={onCopy}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <FormSubmit className="w-full justify-start" variant="ghost">
            Copy list
          </FormSubmit>
        </form>
        <form action={onDelete}>
          <input hidden name="id" id="id" value={list.id} />
          <input hidden name="boardId" id="boardId" value={list.boardId} />
          <FormSubmit className="w-full justify-start px-3" variant="ghost">
            Delete
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
