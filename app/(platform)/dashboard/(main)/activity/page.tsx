import { useCapitalize } from "@/hooks/use-capitalize";
import { db } from "@/lib/db";
import Image from "next/image";
import React from "react";
import { useTitle } from "react-use";

export default async function ActivityPage() {
  useTitle("Activity");
  const activity = (await db.auditLog.findMany()).reverse();
  return (
    <div className="flex flex-col gap-2">
      {activity.map((activityItem) => (
        <div className=" py-2 px-3">
          <div className="flex gap-2 items-center">
            <Image
              src={activityItem.userImage}
              width="50"
              height="50"
              alt="Avatar"
            />
            <div className="text-gray-600">
              <div className="flex items-center gap-1">
                <h2 className="font-bold text-black">
                  {activityItem.userName.split(" ")[0]}
                </h2>
                {/* to past simple (e.g. create -> created */}
                <span>{activityItem.action.toLowerCase() + "d"}</span>
                <span>{activityItem.entityType.toLowerCase()}</span>
                <span>"{activityItem.entityTitle}"</span>
              </div>
              <p>{activityItem.updatedAt.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
