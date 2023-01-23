import { datesFromNewYearUntilNow } from "../utils/dates-from-newyear-until-now";
import { DailyHabit } from "./DailyHabits";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromDayOne = datesFromNewYearUntilNow();

export function SummaryTable() {
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => {
          return (
            <div
              key={`${day}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {datesFromDayOne.map((date) => {
          return <DailyHabit key={date.toDateString()} />;
        })}
      </div>
    </div>
  );
}
