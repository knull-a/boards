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
      include: {
        entity: true,
      },
      where: {
        userId: userId ?? "",
      },
    })
  ).reverse();

  console.log(activity);

  return (
    <div className="flex flex-col gap-2">
      {activity.map((activityItem) => (
        <div className=" py-2 px-3" key={activityItem.id}>
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
                <span>{activityItem.entity.type.toLowerCase()}</span>
                <span>"{activityItem.entity.title}"</span>
              </div>
              <p>{activityItem.updatedAt.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
