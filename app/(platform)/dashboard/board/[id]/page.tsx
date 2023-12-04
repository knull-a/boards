type BoardIdProps = {
  params: {
    id: string;
  };
};
export default function BoardPage({ params }: BoardIdProps) {
  return (
    <div>
      <div>BoardPage</div>
      <div>BoardPage</div>
      <div>BoardPage</div>
      <div>BoardPage</div>
      <div>BoardPage</div>
      <div>{params.id}</div>
    </div>
  );
}
