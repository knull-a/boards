import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

interface Props {
  entityId: string;
  entityTitle: string;
}

export const createAuditLog = async (props: Props) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("User not found!");
    }

    const { entityId, entityTitle } = props;

    // await db.auditLog.create({
    //   data: {
    //     entityId,
    //     entityType,
    //     entityTitle,
    //     action,
    //     userId: user.id,
    //     userImage: user?.imageUrl,
    //     userName: user?.firstName + " " + user?.lastName,
    //   },
    // });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
