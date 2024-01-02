"use client";

import { ActivityIcon, AlignLeft, Layout } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { onClose } from "@/lib/redux/slices/modalSlice";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import CardModalSection from "./section";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { useParams } from "next/navigation";
import { CardWithList } from "@/actions/create-card/types";
import CardModalActions from "./actions";
import ActivityItem from "@/app/(platform)/dashboard/_components/activity-item";
import { AuditLogWithEntity } from "@/lib/create-audit-log";

export default function CardModal() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useAppSelector((state) => state.modalSlice.value.isOpen);
  const id = useAppSelector((state) => state.modalSlice.value.id);

  const queryClient = useQueryClient();
  const params = useParams();

  const close = () => dispatch(onClose());

  const { data: card } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: async () => (await axios.get(`/api/cards/${id}`)).data,
  });

  const { data: auditLogs } = useQuery<AuditLogWithEntity[]>({
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

  const onTitleBlur = () => titleRef.current?.form?.requestSubmit();
  const onDescriptionBlur = () => descriptionRef.current?.form?.requestSubmit();

  function onSubmit(formData: FormData, field: "title" | "description") {
    const title = String(formData.get("title") || card?.title);
    const description = String(
      formData.get("description") || card?.description || ""
    );
    const boardId = params.id as string;

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
        {card && (
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
                    className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] mb-0.5 truncate"
                  />
                </form>
              }
            >
              <p className="text-slate-600">
                in list <span className="underline">{card?.list?.title}</span>
              </p>
            </CardModalSection>

            <CardModalSection
              className="w-full"
              icon={<AlignLeft />}
              title="Description"
            >
              <div className="flex">
                <form
                  action={(formData) => onSubmit(formData, "description")}
                  className="w-full"
                >
                  <FormInput
                    el="Textarea"
                    ref={descriptionRef}
                    onBlur={onDescriptionBlur}
                    id="description"
                    defaultValue={card?.description ?? ""}
                    className="font-semibold ml-1 bg-neutral-200 text-neutral-700 border-transparent relative -left-1.5 w-[95%] mb-0.5 truncate"
                  />
                </form>
                <CardModalActions card={card!} />
              </div>
            </CardModalSection>

            <CardModalSection title="Activity" icon={<ActivityIcon />}>
              <div className="flex flex-col gap-2">
                {auditLogs &&
                  auditLogs.map((activityItem) => (
                    <ActivityItem
                      key={activityItem.id}
                      activityItem={activityItem}
                    />
                  ))}
              </div>
            </CardModalSection>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
