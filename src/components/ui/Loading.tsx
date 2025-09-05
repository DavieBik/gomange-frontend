import React from 'react';

type LoadingProps = {
  inline?: boolean;
  text?: string;
  size?: number;
};

export default function Loading({ inline = false, text = 'Loading...', size = 32 }: LoadingProps) {
  return (
    <div
      className={
        inline
          ? 'flex items-center justify-center py-6'
          : 'fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60'
      }
    >
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin"
          style={{ height: size, width: size, color: 'var(--color-primary, #16a34a)' }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            d="M22 12a10 10 0 0 1-10 10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        {text && (
          <span className="text-base text-primary-700 font-semibold mt-2">{text}</span>
        )}
      </div>
    </div>
  );
}