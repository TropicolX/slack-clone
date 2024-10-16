import React from 'react';

interface ArrowForwardProps {
  color: string;
  size?: number;
}

const ArrowForward = ({ color, size = 20 }: ArrowForwardProps) => {
  return (
    <svg
      data-ebo="true"
      data-qa="arrow-right"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M11.268 15.793a.75.75 0 0 1-1.036-1.085l4.146-3.958H3.75a.75.75 0 0 1 0-1.5h10.628l-4.146-3.957a.75.75 0 0 1 1.036-1.086l5.5 5.25a.75.75 0 0 1 0 1.085z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default ArrowForward;
