import { Button } from "@/components/ui/button";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Langing() {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-col max-w-3xl m-auto text-center gap-4",
        textFont.className
      )}
    >
      <div className="text-3xl text-center md:text-5xl font-bold">
        <h1 className="mb-2 leading-tight">
          Streamline Your Workflow, <br /> Master Your Time
        </h1>
        <p>
          with{" "}
          <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 px-2 text-white">
            Boards.
          </span>
        </p>
      </div>
      <p className="text-gray-400">
        Your all-in-one solution for seamless project management and time
        tracking. Elevate your workflow with customizable Kanban boards,
        designed to empower teams and individuals alike. Effortlessly organize
        tasks, track progress, and stay in control of your time.
      </p>
      <Button asChild>
        <Link href="/sign-in">Get Boards for free</Link>
      </Button>
    </div>
  );
}
