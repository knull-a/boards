import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { useTitle } from "react-use";
import ActivityItem from "../../_components/activity-item";

export default async function ActivityPage() {
  useTitle("Activity");
  const { userId } = auth();
  
  const activity = (
    await db.auditLog.findMany({
      include: {
        entity: true,
      },
      where: {
        userId: userId ?? "",
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
  );

  return (
    <div className="flex flex-col gap-2">
      {activity.map((activityItem) => (
        <ActivityItem activityItem={activityItem} key={activityItem.id} />
      ))}
    </div>
  );
}
