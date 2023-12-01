import { db } from "@/lib/db";
import React from "react";
import Form from "./form";

export default async function BoardsPage() {
  const boards = await db.board.findMany();
  return (
    <div>
      <Form />
      <div className="space-y-2">
        {boards.map((board) => (
          <div key={board.id}>{board.title}</div>
        ))}
      </div>
    </div>
  );
}
