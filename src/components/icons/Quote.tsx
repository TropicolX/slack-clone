import React from 'react';

interface QuoteProps {
  color: string;
  size?: number;
}

const Quote = ({ color, size = 18 }: QuoteProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="quote"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0zM6.75 3a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5zM6 10.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75m.75 5.25a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Quote;
