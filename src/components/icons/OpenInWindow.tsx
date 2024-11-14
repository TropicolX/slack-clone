import React from 'react';

interface OpenInWindowProps {
  className?: string;
  color?: string;
}

const OpenInWindow = ({ className, color }: OpenInWindowProps) => {
  return (
    <svg
      data-0ko="true"
      data-qa="open-in-window"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={20}
      height={20}
    >
      <path
        fill={color}
        className={className}
        fillRule="evenodd"
        d="M9.75 2A2.25 2.25 0 0 0 7.5 4.25v5a2.25 2.25 0 0 0 2.25 2.25h7A2.25 2.25 0 0 0 19 9.25v-5A2.25 2.25 0 0 0 16.75 2zM9 4.25a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-.75.75h-7A.75.75 0 0 1 9 9.25zM3.25 4H6v1.5H3.25a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75V13h1.5v2.75A2.25 2.25 0 0 1 15.25 18h-12A2.25 2.25 0 0 1 1 15.75v-9.5A2.25 2.25 0 0 1 3.25 4"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default OpenInWindow;
