import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDaysForm, setWeekDaysForm] = useState<number[]>([]);

  function createNewHabit(event: FormEvent) {
    // TODO: better input validation
    if (!title || weekDaysForm.length === 0) {
      return;
    }

    api.post("habits", {
      title,
      habitWeekDays: weekDaysForm,
    });

    setTitle("");
    setWeekDaysForm([]);
  }

  function handleToggleWeekDay(checkedDay: number) {
    if (weekDaysForm.includes(checkedDay)) {
      const weekDaysFormWithoutCheckedDay = weekDaysForm.filter(
        (day) => day !== checkedDay
      );
      setWeekDaysForm(weekDaysFormWithoutCheckedDay);
    } else {
      const weekDaysFormWithCheckedDay = [...weekDaysForm, checkedDay].sort();
      setWeekDaysForm(weekDaysFormWithCheckedDay);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What's your new habit?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Any activity you want!"
        className="p-4 mt-3 rounded-lg text-white bg-zinc-800 placeholder:text-zinc-400"
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Which days?
      </label>

      <div className="flex flex-col mt-3 gap-2">
        {weekDays.map((day, index) => {
          return (
            <Checkbox.Root
              key={day}
              className="flex items-center gap-3 group"
              checked={weekDaysForm.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500 transition-colors">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="text-white leading-tight">{day}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 p-4 gap-3 rounded-lg flex item justify-center font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors"
      >
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  );
}
