import { z } from "zod";
import { Card, Prisma } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateCard } from "./schema";

export type CardDto = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<CardDto, Card>;
export type CardWithList = Prisma.CardGetPayload<{
  include: { list: true };
}>;