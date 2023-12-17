import { db } from "@/lib/db";
import BoardItem from "./_components/board-item";
import { useTitle } from "react-use";
import "./globals.css";
import { FormPopover } from "@/components/form/form-popover";
import { auth } from "@clerk/nextjs";

export default async function BoardsPage() {
  useTitle("Boards");
  const { userId } = auth();
  const boards = await db.board.findMany({
    include: {
      image: true
    },
    where: {
      userId: userId ?? "",
    },
  });
  
  return (
    <div>
      <div className="space-y-2 flex items-center flex-wrap gap-4">
        <FormPopover>
          <button className="mt-2 board-item">
            <p className="font-bold text-lg">Create new board</p>
          </button>
        </FormPopover>

        {boards.map((board) => (
          <BoardItem key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}
