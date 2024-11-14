import React from 'react';

interface DesktopProps {
  color?: string;
  size?: number;
}

const Desktop = ({ color, size = 20 }: DesktopProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={size}
      height={size}
      fill={color}
    >
      <path d="M336-145v-72h72v-72H168q-29.7 0-50.85-21.15Q96-331.3 96-361v-384q0-29.7 21.15-50.85Q138.3-817 168-817h624q29.7 0 50.85 21.15Q864-774.7 864-745v384q0 29.7-21.15 50.85Q821.7-289 792-289H552v72h72v72H336ZM168-361h624v-384H168v384Zm0 0v-384 384Z" />
    </svg>
  );
};

export default Desktop;