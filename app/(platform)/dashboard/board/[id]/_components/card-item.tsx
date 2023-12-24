import { Card } from "@prisma/client";

type CardItemProps = {
  card: Card;
};

export default function CardItem({ card }: CardItemProps) {
  return <div className="card-item">{card.title}</div>;
}
