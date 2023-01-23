import dayjs from "dayjs";

export function datesFromNewYearUntilNow() {
  const firstDayOfTheYear = dayjs().startOf("year");
  const today = new Date();

  const dates = [];
  // compareDate will behave as a counter
  let compareDate = firstDayOfTheYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}
