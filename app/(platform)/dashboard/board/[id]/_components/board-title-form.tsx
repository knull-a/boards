"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

type BoardTitleFormProps = {
  board: Board;
};

export default function BoardTitleForm({ board }: BoardTitleFormProps) {
  const formRef = useRef<ElementRef<"form">>(null);

  const onBlur = () => formRef.current?.requestSubmit();

  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success("Board updated!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = board.id;

    execute({ id, title });
  };
  return (
    <form
      className="bg-black/50 text-white font-bold p-4 pb- text-xl"
      action={onSubmit}
      ref={formRef}
    >
      <FormInput
        id="title"
        onBlur={onBlur}
        defaultValue={board?.title}
        className="text-lg font-bold px-2 py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        errors={fieldErrors}
      />
    </form>
  );
}
