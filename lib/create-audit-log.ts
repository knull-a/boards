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

    const { entityTitle, entityType, action } = props;

    const entity = await db.entity.create({
      data: {
        title: entityTitle,
        type: entityType
      }
    })

    await db.auditLog.create({
      data: {
        entityId: entity.id,
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
