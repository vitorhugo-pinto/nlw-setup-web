interface ProgressBarProps {
  progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="h-3 mt-4 w-full rounded-xl bg-zinc-700">
      <div
        role="progressbar"
        aria-label="Habit progress bar"
        aria-valuenow={props.progress}
        className="h-3 w-3/4 rounded-xl bg-violet-600"
        style={{ width: `${props.progress}%` }}
      />
    </div>
  );
}
