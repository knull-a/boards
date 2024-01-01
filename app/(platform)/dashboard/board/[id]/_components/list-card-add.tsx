"use client";

import { createCard } from "@/actions/create-card";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { PlusIcon, XIcon } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

type ListCardAddProps = {
  list: List;
};

export default function ListCardAdd({ list }: ListCardAddProps) {
  const [isAdding, setAdding] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);

  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success("List created!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onBlur = () => formRef.current?.requestSubmit();

  async function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    if (title) await execute({ title, listId: list.id, boardId: list.boardId });

    setAdding(false);
  }

  if (isAdding)
    return (
      <form action={onSubmit} ref={formRef} className="card-item mt-4">
        <FormInput
          onBlur={onBlur}
          errors={fieldErrors}
          id="title"
          placeholder="Enter card title..."
          className="border-none bg-inherit !p-0 !outline-none"
        />
      </form>
    );
  return (
    <button
      onClick={() => setAdding(true)}
      className="flex items-center gap-2 pt-2 mt-2 w-full text-black/60"
    >
      <PlusIcon className="h-4 w-4" />
      Add a card
    </button>
  );
}
