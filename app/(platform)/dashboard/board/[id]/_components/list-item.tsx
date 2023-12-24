import { List } from "@prisma/client";
import ListCardAdd from "./list-card-add";
import ListOptions from "./list-options";
import CardItem from "./card-item";
import { db } from "@/lib/db";

type ListItemProps = {
  list: List;
};

export default async function ListItem({ list }: ListItemProps) {
  const cards = await db.card.findMany({
    where: {
      listId: list.id,
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="card flex flex-col gap-4">
      <div className="mb-2 flex items-center justify-between">
        {/* todo: replace with form input */}
        <h2>{list.title}</h2>  
        <ListOptions list={list} />
      </div>
      {cards.map((card) => (
        <CardItem card={card} key={card.id} />
      ))}
      <ListCardAdd list={list} />
    </div>
  );
}
