interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-3 mt-4 w-full rounded-xl bg-zinc-700">
      <div
        role="progressbar"
        aria-label="Habit progress bar"
        aria-valuenow={progress}
        className="h-3 w-3/4 rounded-xl bg-violet-600 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
