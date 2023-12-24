"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CardDto, ReturnType } from "./types";
import { CreateCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: CardDto): Promise<ReturnType> => {
  const { userId } = auth();

  const { title, listId, boardId } = data;

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const list = await db.list.findUnique({
    where: {
      id: listId,
    },
  });

  if (!list) {
    return {
      error: "List not found",
    };
  }

  const lastCard = await db.card.findFirst({
    where: { listId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newOrder = lastCard ? lastCard.order + 1 : 1;
  let card;

  try {
    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: String(error),
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
