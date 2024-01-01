"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CardDto, ReturnType } from "./types";
import { UpdateCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: CardDto): Promise<ReturnType> => {
  const { userId } = auth();

  const { title, boardId, id, description } = data;

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  let card;

  try {
    card = await db.card.update({
      where: {
        id,
      },
      data: {
        title,
        description
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityRelationId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: String(error),
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
