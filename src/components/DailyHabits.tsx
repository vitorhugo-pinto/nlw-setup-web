import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import { HabitList } from "./HabitList";
import { ProgressBar } from "./ProgressBar";

interface DailyHabitProps {
  date: Date;
  initialCompleted?: number;
  total?: number;
}

export function DailyHabit({
  initialCompleted = 0,
  total = 0,
  date,
}: DailyHabitProps) {
  const dateToDisplay = dayjs(date).format("MMM-DD");
  const weekDayNameToDisplay = dayjs(date).format("dddd");

  const [completed, setCompleted] = useState(initialCompleted);

  const percentageCompletion =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  function handleCompletedHabits(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg",
          {
            "bg-violet-500 border-violet-400": percentageCompletion >= 80,
            "bg-violet-600 border-violet-500":
              percentageCompletion >= 60 && percentageCompletion < 80,
            "bg-violet-700 border-violet-500":
              percentageCompletion >= 40 && percentageCompletion < 60,
            "bg-violet-800 border-violet-600":
              percentageCompletion >= 20 && percentageCompletion < 40,
            "bg-violet-900 border-violet-700":
              percentageCompletion > 0 && percentageCompletion < 20,
            "bg-zinc-900 border-zinc-800": percentageCompletion === 0,
          }
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">
            {weekDayNameToDisplay}
          </span>
          <span className="mt-2 font-extrabold leading-tight text-3xl text-white">
            {dateToDisplay}
          </span>

          <ProgressBar progress={percentageCompletion} />

          <HabitList
            date={date}
            onToggleCompletedHabits={handleCompletedHabits}
          />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
