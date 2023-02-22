import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { datesFromNewYearUntilNow } from "../utils/dates-from-newyear-until-now";
import { DailyHabit } from "./DailyHabits";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const datesFromDayOne = datesFromNewYearUntilNow();

type Summary = {
  id: string;
  date: string;
  completed: number;
  total: number;
}[];

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

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
        {summary.length &&
          datesFromDayOne.map((date) => {
            const isDateInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });

            return (
              <DailyHabit
                key={date.toString()}
                date={date}
                initialCompleted={isDateInSummary?.completed}
                total={isDateInSummary?.total}
              />
            );
          })}
      </div>
    </div>
  );
}
