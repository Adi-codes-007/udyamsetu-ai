import React from 'react';

interface SlaIndicatorProps {
  elapsedDays: number;
  slaDays: number;
  showBar?: boolean;
}

export function SlaIndicator({ elapsedDays, slaDays, showBar = true }: SlaIndicatorProps) {
  const ratio = slaDays > 0 ? elapsedDays / slaDays : 0;
  const percentage = Math.min(Math.round(ratio * 100), 100);

  let statusText = 'ON TRACK';
  let badgeClasses = 'text-[#16855b] bg-[#e8f5ef] border-[#c2e5d5]';
  let barColor = 'bg-[#16855b]';

  if (elapsedDays > slaDays) {
    statusText = 'SLA BREACHED';
    badgeClasses = 'text-[#c93636] bg-[#fcedec] border-[#f8c9c9]';
    barColor = 'bg-[#c93636]';
  } else if (ratio >= 0.85) {
    statusText = 'SLA RISK';
    badgeClasses = 'text-[#c93636] bg-[#fcedec] border-[#f8c9c9]';
    barColor = 'bg-[#c93636]';
  } else if (ratio >= 0.7) {
    statusText = 'APPROACHING SLA';
    badgeClasses = 'text-[#c06c1c] bg-[#fdf5ea] border-[#f6deb9]';
    barColor = 'bg-[#d9822b]';
  }

  return (
    <div className="flex flex-col gap-1 min-w-[120px]">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold text-[#17202A]">
          {elapsedDays} / {slaDays} days
        </span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${badgeClasses}`}>
          {statusText}
        </span>
      </div>

      {showBar && (
        <div className="w-full bg-[#e8eef3] h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
            style={{ width: `${Math.min(ratio * 100, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
