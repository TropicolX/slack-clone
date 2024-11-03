import React from 'react';

interface BoldProps {
  color: string;
  size?: number;
}

const Bold = ({ color, size = 18 }: BoldProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="bold"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M4 2.75A.75.75 0 0 1 4.75 2h6.343a3.91 3.91 0 0 1 3.88 3.449A2 2 0 0 1 15 5.84l.001.067a3.9 3.9 0 0 1-1.551 3.118A4.627 4.627 0 0 1 11.875 18H4.75a.75.75 0 0 1-.75-.75V9.5a.8.8 0 0 1 .032-.218A.8.8 0 0 1 4 9.065zm2.5 5.565h3.593a2.157 2.157 0 1 0 0-4.315H6.5zm4.25 1.935H6.5v5.5h4.25a2.75 2.75 0 1 0 0-5.5"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Bold;
