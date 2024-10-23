import React from 'react';

interface MoreVertProps {
  className?: string;
  color?: string;
  size?: number;
}

const MoreVert = ({ className, color, size = 20 }: MoreVertProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="ellipsis-vertical-filled"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        className={className}
        fillRule="evenodd"
        d="M10 5.5A1.75 1.75 0 1 1 10 2a1.75 1.75 0 0 1 0 3.5m0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5m-1.75 4.5a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default MoreVert;
