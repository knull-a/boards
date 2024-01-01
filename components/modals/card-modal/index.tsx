"use client";

import { Layout } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { onClose } from "@/lib/redux/slices/modalSlice";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { AuditLog } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import CardModalSection from "./section";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { CardWithList } from "@/actions/create-card/types";

export default function CardModal() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useAppSelector((state) => state.modalSlice.value.isOpen);
  const id = useAppSelector((state) => state.modalSlice.value.id);

  const queryClient = useQueryClient();
  const params = useParams();

  const close = () => dispatch(onClose());

  const { data: card, isLoading: isCardLoading } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: async () => (await axios.get(`/api/cards/${id}`)).data,
  });

  const { data: auditLogs, isLoading: isLogsLoading } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: async () => (await axios.get(`/api/cards/${id}/logs`)).data,
  });

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Card updated.`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const titleRef = useRef<ElementRef<"input">>(null);
  const descriptionRef = useRef<ElementRef<"textarea">>(null);

  const [isLoading] = useState((isCardLoading || isLogsLoading) && !card);

  const onTitleBlur = () => titleRef.current?.form?.requestSubmit();
  const onDescriptionBlur = () => descriptionRef.current?.form?.requestSubmit();

  function onSubmit(formData: FormData, field: "title" | "description") {
    const title = String(formData.get("title") || card?.title);
    const description = String(
      formData.get("description") || card?.description || ""
    );
    const boardId = params.id as string;

    // temp. remove ASAP
    if (title === "undefined" || description === "undefined") return;

    // Return if field didn't change
    if (field === "title" && title === card?.title) return;
    if (field === "description" && description === card?.description) return;

    execute({
      title,
      description,
      boardId,
      id: card?.id ?? "",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        {isLoading && (
          <>
            <CardModalSection
              icon={<Layout />}
              title={
                <form action={(formData) => onSubmit(formData, "title")}>
                  <FormInput
                    ref={titleRef}
                    onBlur={onTitleBlur}
                    id="title"
                    defaultValue={card?.title}
                    className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
                  />
                </form>
              }
            >
              <p className="text-slate-600">
                in list <span className="underline">{card?.list?.title}</span>
              </p>
            </CardModalSection>

            <CardModalSection icon={<Layout />} title="Description">
              <form action={(formData) => onSubmit(formData, "description")}>
                <FormInput
                  el="Textarea"
                  ref={descriptionRef}
                  onBlur={onDescriptionBlur}
                  id="description"
                  defaultValue={card?.description ?? ""}
                  className="font-semibold px-1 bg-gray-100 text-neutral-700 border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
                />
              </form>
            </CardModalSection>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
