// PercentBar.tsx
import React from "react";

type PercentBarProps = {
  /** 0–100 (floats ok) */
  value: number;
  /** px height of the bar (default 10) */
  height?: number;
  /** Optional for a11y; defaults to "Progress" */
  ariaLabel?: string;
  className?: string;
};

export default function ProgressBar({
  value,
  height = 5,
  ariaLabel = "Progress",
  className = "",
}: PercentBarProps) {
  const safe = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const pctInt = Math.round(safe);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pctInt}
        aria-valuetext={`${pctInt}%`}
        className="relative w-full"
        style={{ height }}
      >
        <div className="h-full w-full rounded-full bg-gray-200/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#F8BD00] transition-[width] duration-300"
            style={{ width: `${safe}%` }}
          />
        </div>
      </div>
      <span className="text-xs text-right tabular-nums font-bold text-[#B48E14]">{pctInt}%</span>
    </div>
  );
}
