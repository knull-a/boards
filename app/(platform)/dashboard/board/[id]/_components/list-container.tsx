"use client";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ListItem from "./list-item";
import ListAddForm from "./list-add-form";
import { Board } from "@prisma/client"
import { useState } from "react";
import { ListWithCards } from "@/actions/create-list/types";

type ListContainerProps = {
  board: Board;
  lists: ListWithCards[];
};

export default function ListContainer({ board, lists }: ListContainerProps) {
  const [orderedLists, setOrderedList] = useState(lists);

  return (
    <div className="py-4 px-3">
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-4 h-full"
            >
              {orderedLists.map((list, index) => (
                <ListItem key={list.id} list={list} index={index} />
              ))}
              {provided.placeholder}
              <ListAddForm board={board as Board} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
