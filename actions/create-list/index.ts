"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { ListDto, ReturnType } from "./types";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: ListDto): Promise<ReturnType> => {
  const { userId } = auth();

  const { title, boardId } = data;

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return {
      error: "Board not found",
    };
  }

  const lastList = await db.list.findFirst({
    where: { boardId: boardId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newOrder = lastList ? lastList.order + 1 : 1;

  let list;

  try {
    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: String(error),
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
