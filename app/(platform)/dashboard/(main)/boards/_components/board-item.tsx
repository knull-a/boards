import { Prisma } from "@prisma/client";
import Link from "next/link";

type BoardItemProps = {
  board: Prisma.BoardGetPayload<{
    include: { image: true };
  }>;
};

export default function BoardItem({ board }: BoardItemProps) {
  return (
    <Link
      href={`/dashboard/board/${board.id}`}
      className="board-item"
      style={{
        background: `url(${board.image.thumbUrl}) no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <div className="p-4 text-xl font-bold text-white">{board.title}</div>
    </Link>
  );
}
