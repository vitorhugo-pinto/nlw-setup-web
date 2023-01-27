import { Check } from "phosphor-react";

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        What's your new habit?
      </label>
      <input
        type="text"
        id="title"
        placeholder="Any activity you want!"
        className="p-4 mt-3 rounded-lg text-white bg-zinc-800 placeholder:text-zinc-400"
        autoFocus
      ></input>

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Which days?
      </label>
      <button
        type="submit"
        className="mt-6 p-4 gap-3 rounded-lg flex item justify-center font-semibold bg-green-600 text-white hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirm
      </button>
    </form>
  );
}
