import { List } from "@prisma/client";
import ListCardAdd from "./list-card-add";
import ListOptions from "./list-options";
import CardItem from "./card-item";
import { db } from "@/lib/db";
import ListTitleForm from "./list-title-form";

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
    <div className="card h-full flex flex-col gap-4">
      <div className="mb-2 flex items-center justify-between">
        <ListTitleForm list={list} />
        <ListOptions list={list} />
      </div>
      {cards.map((card) => (
        <CardItem card={card} key={card.id} />
      ))}
      <ListCardAdd list={list} />
    </div>
  );
}
