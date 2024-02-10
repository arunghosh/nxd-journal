import dayjs from "dayjs";

export function getAge(date: Date): string {
  const days = dayjs().diff(date, "days");
  if (days) return `${days}d`;
  const hours = dayjs().diff(date, "hours");
  if (hours) return `${hours}h`;
  const minutes = dayjs().diff(date, "minutes");
  return `${minutes}m`;
}

export function getAgeInDays(date: Date): number {
  return dayjs().diff(date, "days");
}
