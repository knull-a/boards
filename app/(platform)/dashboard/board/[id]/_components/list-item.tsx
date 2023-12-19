import { List } from "@prisma/client";
import ListCardAdd from "./list-card-add";
import ListOptions from "./list-options";

type ListItemProps = {
  list: List;
};

export default function ListItem({ list }: ListItemProps) {
  return (
    <div className="card">
      <div className="mb-2 flex items-center justify-between">
        <h2>{list.title}</h2>
        <ListOptions list={list} />
      </div>
      <ListCardAdd />
    </div>
  );
}
