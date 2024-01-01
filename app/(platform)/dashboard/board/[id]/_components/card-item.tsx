import { onOpen } from "@/lib/redux/slices/modalSlice";
import { AppDispatch } from "@/lib/redux/store";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import { useDispatch } from "react-redux";

type CardItemProps = {
  card: Card;
  index: number;
};

export default function CardItem({ card, index }: CardItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const open = (payload: string) => dispatch(onOpen(payload));

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          onClick={() => open(card.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="card-item"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
}
