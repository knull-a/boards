import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ACTION, ENTITY_TYPE, Prisma } from "@prisma/client";

type CreateAuditLogsProps = {
  entityRelationId: string;
  entityTitle: string;
  entityType: ENTITY_TYPE;
  action: ACTION;
};

export type AuditLogWithEntity = Prisma.AuditLogGetPayload<{
  include: { entity: true };
}>;

export const createAuditLog = async ({
  entityTitle,
  entityType,
  action,
  entityRelationId,
}: CreateAuditLogsProps) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("User not found!");
    }

    const entity = await db.entity.create({
      data: {
        title: entityTitle,
        type: entityType,
      },
    });

    await db.auditLog.create({
      data: {
        entityId: entity.id,
        entityRelationId,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
