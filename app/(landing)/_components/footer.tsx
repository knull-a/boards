import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="fixed bg-white bottom-0 w-full">
      <div className="bar">
        <div />
        <div className="flex items-center gap-3">
          <Button variant="link" asChild>
            <Link href="https://github.com/knull-a" target="_blank">
              Github
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="https://t.me/iz8jnek" target="_blank">
              Telegram
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
