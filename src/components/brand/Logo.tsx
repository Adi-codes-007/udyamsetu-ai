import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  href?: string;
}

export function Logo({ className = '', size = 'md', showTagline = false, href = '/' }: LogoProps) {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 38 : 30;
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Abstract geometric bridge & architectural node emblem */}
      <div 
        className="flex items-center justify-center rounded bg-[#17324D] text-white shrink-0 shadow-sm border border-[#1f4e79]"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4/5 h-4/5 text-[#428ba8]"
        >
          {/* Bridge arch and connecting nodes representing single-window facilitation */}
          <path
            d="M5 24V19C5 12.9249 9.92487 8 16 8C22.0751 8 27 12.9249 27 19V24"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M10 24V16"
            stroke="#63b3ed"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 24V12"
            stroke="#63b3ed"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22 24V16"
            stroke="#63b3ed"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Central convergence node */}
          <circle cx="16" cy="8" r="2.5" fill="#38bdf8" />
          <path d="M4 25H28" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-bold tracking-tight text-[#17324D] ${textSize}`}>
            Udyam<span className="text-[#1F4E79]">Setu</span>
          </span>
          <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#edf4fa] text-[#1f4e79] border border-[#c8dced]">
            AI
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-[#667085] tracking-tight mt-0.5">
            One Business Profile. One Approval Roadmap. One Window.
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-flex items-center">{content}</Link>;
  }

  return content;
}
