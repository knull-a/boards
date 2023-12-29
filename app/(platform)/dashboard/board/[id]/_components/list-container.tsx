"use client";

import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import ListItem from "./list-item";
import ListAddForm from "./list-add-form";
import { Board } from "@prisma/client";
import { useEffect, useState } from "react";
import { ListWithCards } from "@/actions/create-list/types";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";
import { updateListOrder } from "@/actions/update-list-order";

type ListContainerProps = {
  board: Board;
  lists: ListWithCards[];
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  // todo: change to toSplice and spread
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function ListContainer({ board, lists }: ListContainerProps) {
  const [orderedLists, setOrderedLists] = useState(lists);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedLists(lists);
  }, [lists]);

  function onDragEnd(result: DropResult) {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "list") moveList(destination, source);
    if (type === "card") moveCard(destination, source);
  }

  function moveList(destination: DraggableLocation, source: DraggableLocation) {
    const items = reorder(orderedLists, source.index, destination.index).map(
      (item, index) => ({ ...item, order: index })
    );

    setOrderedLists(items);
    executeUpdateListOrder({ items, boardId: board.id });
  }

  function moveCard(destination: DraggableLocation, source: DraggableLocation) {
    let newOrderedData = [...orderedLists];

    const sourceList = newOrderedData.find(
      (list) => list.id === source.droppableId
    );
    const destList = newOrderedData.find(
      (list) => list.id === destination.droppableId
    );

    if (!sourceList || !destList) return;

    if (!sourceList.cards) sourceList.cards = [];

    if (!destList.cards) destList.cards = [];

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = reorder(
        sourceList.cards,
        source.index,
        destination.index
      );

      reorderedCards.forEach((card, idx) => {
        card.order = idx;
      });

      sourceList.cards = reorderedCards;

      setOrderedLists(newOrderedData);
      executeUpdateCardOrder({
        boardId: board.id,
        items: reorderedCards,
      });
    } else {
      const [movedCard] = sourceList.cards.splice(source.index, 1);

      movedCard.listId = destination.droppableId;

      destList.cards.splice(destination.index, 0, movedCard);

      sourceList.cards.forEach((card, idx) => {
        card.order = idx;
      });

      destList.cards.forEach((card, idx) => {
        card.order = idx;
      });

      setOrderedLists(newOrderedData);
      executeUpdateCardOrder({
        boardId: board.id,
        items: destList.cards,
      });
    }
  }

  return (
    <div className="py-4 px-3">
      <DragDropContext onDragEnd={onDragEnd}>
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
