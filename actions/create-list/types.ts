import { z } from "zod";
import { List, Prisma } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateList } from "./schema";

export type ListDto = z.infer<typeof CreateList>;
export type ReturnType = ActionState<ListDto, List>;
export type ListWithCards = Prisma.ListGetPayload<{
  include: { cards: true };
}>;
