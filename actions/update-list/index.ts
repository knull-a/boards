"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateListDto, ReturnType } from "./types";
import { UpdateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: UpdateListDto): Promise<ReturnType> => {
  const { userId } = auth();

  const { title, boardId, id } = data;

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId
      },
      data: {
        title
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityRelationId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: String(error),
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
