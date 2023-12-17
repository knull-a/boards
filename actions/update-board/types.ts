import { z } from "zod";
import { UpdateBoard } from "./schema";

export type UpdateInputType = z.infer<typeof UpdateBoard>;
