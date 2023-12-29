import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

type CardItemProps = {
  card: Card;
  index: number;
};

export default function CardItem({ card, index }: CardItemProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
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
