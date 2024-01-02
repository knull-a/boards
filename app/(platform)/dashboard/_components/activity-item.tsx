import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuditLogWithEntity } from "@/lib/create-audit-log";

type ActivityItemProps = {
  activityItem: AuditLogWithEntity;
};

export default function ActivityItem({ activityItem }: ActivityItemProps) {
  return (
    <div className="py-2">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage
            src={activityItem.userImage}
            width="50"
            height="50"
            alt="Avatar"
          />
          <AvatarFallback>{activityItem.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-gray-600">
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-black">
              {activityItem.userName.split(" ")[0]}
            </h2>
            {/* to past simple (e.g. create -> created */}
            <span>{activityItem.action.toLowerCase() + "d"}</span>
            <span>{activityItem.entity.type.toLowerCase()}</span>
            <span>{`"${activityItem.entity.title}"`}</span>
          </div>
          <p>{activityItem.updatedAt.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
