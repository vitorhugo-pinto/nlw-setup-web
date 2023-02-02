import * as Checkbox from "@radix-ui/react-checkbox";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { Check } from "phosphor-react";
import { ProgressBar } from "./ProgressBar";

interface DailyHabitProps {
  completed: number;
  total: number;
}

export function DailyHabit({ completed, total }: DailyHabitProps) {
  const percentageCompletion = Math.round((completed / total) * 100);

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
          <span className="font-semibold text-zinc-400">tuesday</span>
          <span className="mt-2 font-extrabold leading-tight text-3xl text-white">
            01/17
          </span>

          <ProgressBar progress={percentageCompletion} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2L de água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
