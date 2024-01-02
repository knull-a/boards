import { WithChildren } from "@/app/types";
import React from "react";

type CardModalSectionProps = {
  title: any;
  icon: any;
  className?: string
} & WithChildren;

export default function CardModalSection({
  title,
  icon,
  className,
  children,
}: CardModalSectionProps) {
  return (
    <div className={className}>
      <div className="flex items-center mb-2 gap-4">
        {icon}
        <h2 className="text-xl text-neutral-700 font-bold">{title}</h2>
      </div>
      <div className="pl-10">{children}</div>
    </div>
  );
}
