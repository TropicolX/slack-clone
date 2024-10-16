import React from 'react';

interface SearchProps {
  color: string;
  size?: number;
}

const Search = ({ color, size = 20 }: SearchProps) => {
  return (
    <svg
      data-ebo="true"
      data-qa="search"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M9 3a6 6 0 1 0 0 12A6 6 0 0 0 9 3M1.5 9a7.5 7.5 0 1 1 13.307 4.746l3.473 3.474a.75.75 0 1 1-1.06 1.06l-3.473-3.473A7.5 7.5 0 0 1 1.5 9"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Search;
