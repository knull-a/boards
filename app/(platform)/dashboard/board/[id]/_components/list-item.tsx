"use client";

import ListCardAdd from "./list-card-add";
import ListOptions from "./list-options";
import CardItem from "./card-item";
import ListTitleForm from "./list-title-form";
import { ListWithCards } from "@/actions/create-list/types";

import { Draggable, Droppable } from "@hello-pangea/dnd";

type ListItemProps = {
  list: ListWithCards;
  index: number;
};

export default function ListItem({ list, index }: ListItemProps) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="card h-full"
        >
          <div className=" flex flex-col gap-4" {...provided.dragHandleProps}>
            <div className="mb-2 flex items-center justify-between">
              <ListTitleForm list={list} />
              <ListOptions list={list} />
            </div>
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-4"
                >
                  {list.cards.map((card, index) => (
                    <CardItem card={card} key={card.id} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <ListCardAdd list={list} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
