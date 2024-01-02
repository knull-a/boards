import { db } from "@/lib/db";
import BoardTitleForm from "./_components/board-title-form";
import { Board } from "@prisma/client";
import ListContainer from "./_components/list-container";

type BoardIdProps = {
  params: {
    id: string;
  };
};
export default async function BoardPage({ params }: BoardIdProps) {
  const board = await db.board.findUnique({
    where: {
      id: params.id,
    },
    include: {
      image: true,
    },
  });

  const lists = await db.list.findMany({
    where: {
      boardId: params.id,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc"
        }
      }
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div
      className="w-full h-screen overflow-x-hidden pt-14"
      style={{
        backgroundImage: `url("${board?.image.fullUrl}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <BoardTitleForm board={board as Board} />
      <ListContainer board={board as Board} lists={lists} />
    </div>
  );
}
