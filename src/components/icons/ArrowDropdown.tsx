import React from 'react';

interface ArrowDropdownProps {
  color: string;
  size?: number;
}

const ArrowDropdown = ({ color, size = 24 }: ArrowDropdownProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={color}
      width={size}
      height={size}
    >
      <path d="M480-384 288-576h384L480-384Z" />
    </svg>
  );
};

export default ArrowDropdown;
