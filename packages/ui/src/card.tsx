export function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
  <div className="relative border rounded-lg w-full bg-white p-6">
    <div className="border-b pb-2 text-xl">{title}</div>
    <div>{children}</div>
  </div>

      );
}
