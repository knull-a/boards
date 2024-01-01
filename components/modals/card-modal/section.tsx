import { WithChildren } from "@/app/types";
import React from "react";

type CardModalSectionProps = {
  title: any;
  icon: any;
} & WithChildren;

export default function CardModalSection({
  title,
  icon,
  children,
}: CardModalSectionProps) {
  return (
    <div>
      <div className="flex items-center mb-2 gap-4">
        {icon}
        <h2 className="text-xl text-neutral-700 font-bold">{title}</h2>
      </div>
      <div className="pl-10">{children}</div>
    </div>
  );
}
