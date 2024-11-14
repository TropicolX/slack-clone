import React from 'react';

interface RefineProps {
  className?: string;
  color?: string;
  size?: number;
}

const Refine = ({ className, color, size = 20 }: RefineProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="refine"
      aria-hidden="true"
      aria-label="refine"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        className={className}
        fillRule="evenodd"
        d="M3.75 5.5a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5zM5 10.25a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75m2 4a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Refine;
