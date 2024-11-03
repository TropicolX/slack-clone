import React from 'react';

interface PlusProps {
  className?: string;
  color?: string;
  filled?: boolean;
  size?: number;
}

const Plus = ({ className, color, filled = false, size = 20 }: PlusProps) => {
  if (filled)
    return (
      <svg
        data-5iu="true"
        data-qa="plus-filled"
        aria-hidden="true"
        viewBox="0 0 20 20"
        width={size}
        height={size}
      >
        <path
          fill={color}
          className={className}
          fillRule="evenodd"
          d="M11 3.5a1 1 0 1 0-2 0V9H3.5a1 1 0 0 0 0 2H9v5.5a1 1 0 1 0 2 0V11h5.5a1 1 0 1 0 0-2H11z"
          clipRule="evenodd"
        ></path>
      </svg>
    );

  return (
    <svg
      data-5iu="true"
      data-qa="plus"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        className={className}
        fillRule="evenodd"
        d="M10.75 3.25a.75.75 0 0 0-1.5 0v6H3.251L3.25 10v-.75a.75.75 0 0 0 0 1.5V10v.75h6v6a.75.75 0 0 0 1.5 0v-6h6a.75.75 0 0 0 0-1.5h-6z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Plus;
