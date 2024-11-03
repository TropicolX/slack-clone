import React from 'react';

interface ItalicProps {
  color: string;
  size?: number;
}

const Italic = ({ color, size = 18 }: ItalicProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="italic"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M7 2.75A.75.75 0 0 1 7.75 2h7.5a.75.75 0 0 1 0 1.5H12.3l-2.6 13h2.55a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5H7.7l2.6-13H7.75A.75.75 0 0 1 7 2.75"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Italic;
