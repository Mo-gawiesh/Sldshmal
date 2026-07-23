import React from 'react';

interface SectionKickerProps {
  index: string;
  label: string;
  english?: string;
}

export function SectionKicker({ index, label }: SectionKickerProps) {
  return (
    <div className="flex items-center gap-4 text-[#98c25f] mb-6">
      <span className="text-xl md:text-2xl font-light tabular-nums">{index}</span>
      <div className="h-px flex-1 bg-current/25" />
      <span className="text-[0.7rem] md:text-xs uppercase tracking-[0.35em] font-semibold">{label}</span>
    </div>
  );
}
