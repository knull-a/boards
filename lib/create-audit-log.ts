import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface Props {
  entityId: string;
  entityTitle: string;
  entityType: ENTITY_TYPE;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("User not found!");
    }

    const { entityId, entityTitle, entityType, action } = props;

    await db.entity.create({
      data: {
        id: entityId,
        title: entityTitle,
        type: entityType
      }
    })

    await db.auditLog.create({
      data: {
        entityId,
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
