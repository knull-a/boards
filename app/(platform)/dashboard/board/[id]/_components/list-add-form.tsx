"use client";
import { FormInput } from "@/components/form/form-input";
import "../globals.css";

import { Plus, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";
import { Board } from "@prisma/client";

type ListAddFormProps = {
  board: Board;
};

export default function ListAddForm({ board }: ListAddFormProps) {
  const [isAdding, setAdding] = useState(false);

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success("List created!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  async function onSubmit (formData: FormData) {
    const title = formData.get("title") as string;

    await execute({ title, boardId: board.id });

    setAdding(false)
  };

  if (isAdding)
    return (
      <form
        action={onSubmit}
        className="card max-w-[272px] flex flex-col gap-2"
      >
        <FormInput
          errors={fieldErrors}
          id="title"
          placeholder="Enter list title..."
          className="border-none bg-inherit"
        />
        <div className="flex items-center">
          <FormSubmit>Add list</FormSubmit>
          <Button
            type="button"
            onClick={() => setAdding(false)}
            variant="ghost"
          >
            <XIcon />
          </Button>
        </div>
      </form>
    );

  return (
    <div>
      <div className="shrink-0 h-full w-[272px] select-none">
        <button
          onClick={() => setAdding(true)}
          className="card hover:bg-white/70 flex items-center"
        >
          <Plus className="h-4 w-4" />
          Add a list
        </button>
      </div>
    </div>
  );
}
