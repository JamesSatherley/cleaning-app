export const getNextCollectionDate = (
  type: "rubbish" | "glass" | "recycling",
  startDates: Record<"rubbish" | "glass" | "recycling", Date>
): { date: Date; message: string } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = startDates[type];
  const nextDate = new Date(startDate);

  while (nextDate < today) {
    nextDate.setDate(nextDate.getDate() + 14); // Fortnightly increment
  }

  const diff = Math.ceil(
    (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let message = "";
  if (diff === 0) {
    message = "today";
  } else if (diff === 1) {
    message = "tomorrow";
  } else {
    message = `on ${nextDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })}`;
  }

  return { date: nextDate, message };
};
