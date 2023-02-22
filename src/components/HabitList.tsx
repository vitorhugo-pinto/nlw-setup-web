import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

type HabitListData = {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
};

interface HabitListProps {
  date: Date;
  onToggleCompletedHabits: (completed: number) => void;
}

export function HabitList({ date, onToggleCompletedHabits }: HabitListProps) {
  const [habitListData, setHabitListData] = useState<HabitListData>();

  const params = new URLSearchParams([["date", date.toISOString()]]);

  useEffect(() => {
    api.get("day", { params }).then((response) => {
      setHabitListData(response.data);
    });
  }, []);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);

    const isHabitCompleted = habitListData!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitCompleted) {
      completedHabits = habitListData!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitListData!.completedHabits, habitId];
    }
    setHabitListData({
      possibleHabits: habitListData!.possibleHabits,
      completedHabits,
    });

    onToggleCompletedHabits(completedHabits.length);
  }

  const isPastDate = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitListData?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitListData.completedHabits.includes(habit.id)}
            disabled={isPastDate}
            className="flex items-center gap-3 group"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500 transition-colors">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
