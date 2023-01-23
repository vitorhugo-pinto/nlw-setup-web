import dayjs from "dayjs";

export function datesFromNewYearUntilNow() {
  const fisrtDayOfTheYear = dayjs().startOf("year");
  const today = new Date();

  const dates = [];
  // compareDate will behave as a counter
  let compareDate = fisrtDayOfTheYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}
