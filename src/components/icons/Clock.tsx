import React from 'react';

interface ClockProps {
  color: string;
  size?: number;
}

const Clock = ({ color, size = 20 }: ClockProps) => {
  return (
    <svg
      data-ebo="true"
      data-qa="clock"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M2.5 10a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18m.75 4.75a.75.75 0 0 0-1.5 0v4.75c0 .414.336.75.75.75h3.75a.75.75 0 0 0 0-1.5h-3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Clock;
