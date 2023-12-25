"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

type ListTitleFormProps = {
  list: List;
};

export default function ListTitleForm({ list }: ListTitleFormProps) {
  const formRef = useRef<ElementRef<"form">>(null);

  const onBlur = () => formRef.current?.requestSubmit();

  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success("List updated!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = list.boardId;
    const id = list.id;

    execute({ boardId, title, id });
  };
  return (
    <form action={onSubmit} ref={formRef}>
      <FormInput
        id="title"
        onBlur={onBlur}
        defaultValue={list?.title}
        className="font-bold px-2 py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        errors={fieldErrors}
      />
    </form>
  );
}
