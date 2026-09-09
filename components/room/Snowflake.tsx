import React from 'react';

/** Emblema existente do cliente, preservado traço por traço. */
export function Snowflake({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="50" y1="12" x2="50" y2="88" />
      <line x1="17.1" y1="31" x2="82.9" y2="69" />
      <line x1="17.1" y1="69" x2="82.9" y2="31" />
      <path d="M40 22 L50 32 L60 22" />
      <path d="M40 78 L50 68 L60 78" />
      <path d="M22 41 L34 40 L31 28" />
      <path d="M78 59 L66 60 L69 72" />
      <path d="M22 59 L34 60 L31 72" />
      <path d="M78 41 L66 40 L69 28" />
      <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default Snowflake;
