import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";
import { useTitle } from "react-use";

export default async function ActivityPage() {
  useTitle("Activity");
  const { userId } = auth();
  const activity = (
    await db.auditLog.findMany({
      where: {
        userId: userId ?? "",
      },
    })
  ).reverse();

  return (
    <div className="flex flex-col gap-2">
      {activity.map((activityItem) => (
        <div className=" py-2 px-3">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={activityItem.userImage}
                width="50"
                height="50"
                alt="Avatar"
              />
              <AvatarFallback>
                {activityItem.userName.split(" ")[0].charAt(0)}
              </AvatarFallback>
            </Avatar>
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
