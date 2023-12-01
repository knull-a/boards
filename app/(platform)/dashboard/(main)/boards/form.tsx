"use client";

import { createBoard } from "@/actions/create-board";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { useFormState } from "react-dom";

export default function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string;

    execute({ title });
  }
  return (
    <form action={onSubmit}>
      <div>
        <FormInput id="title" type="text" placeholder="enter text" />
        {fieldErrors?.title && (
          <div>
            {fieldErrors.title.map((error) => (
              <p className="text-rose-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
      <FormSubmit>Submit</FormSubmit>
    </form>
  );
}
