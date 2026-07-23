export function FormattedDate({ date }: { date: Date | string }) {
  const parsedDate = date instanceof Date ? date : new Date(date);

  return (
    <span>
      {new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
      }).format(parsedDate)}
    </span>
  );
}
