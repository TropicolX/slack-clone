import React from 'react';

interface CloseProps {
  color?: string;
  size?: number;
  className?: string;
}

const Close = ({ className, color, size = 20 }: CloseProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill={color}
      className={className}
    >
      <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
    </svg>
  );
};

export default Close;
