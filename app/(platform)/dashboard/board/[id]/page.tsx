import { db } from "@/lib/db";
import BoardTitleForm from "./_components/board-title-form";
import { Board } from "@prisma/client";
import ListAddForm from "./_components/list-add-form";
import ListItem from "./_components/list-item";

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
      <div className="py-4 px-3">
        <div className="flex gap-4">
          {lists.map((list) => (
            <ListItem key={list.id} list={list} />
          ))}
          <ListAddForm board={board as Board} />
        </div>
      </div>
    </div>
  );
}
