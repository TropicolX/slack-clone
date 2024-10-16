import React from 'react';

interface HashProps {
  color: string;
  size?: number;
}

const Hash = ({ color, size = 20 }: HashProps) => {
  return (
    <svg
      data-ebo="true"
      data-qa="sidebar-channel-icon-prefix"
      aria-hidden="true"
      data-sidebar-channel-icon="channel"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M9.984 4.176a1 1 0 0 0-1.968-.352L7.448 7H4a1 1 0 0 0 0 2h3.091l-.803 4.5H3a1 1 0 1 0 0 2h2.93l-.414 2.324a1 1 0 0 0 1.968.352l.478-2.676h2.719l-.415 2.324a1 1 0 1 0 1.968.352l.478-2.676H16a1 1 0 1 0 0-2h-2.93l.803-4.5H17a1 1 0 1 0 0-2h-2.77l.504-2.824a1 1 0 1 0-1.968-.352L12.198 7H9.48zm1.054 9.324L11.84 9H9.123l-.804 4.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Hash;
