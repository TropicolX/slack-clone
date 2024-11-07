import React from 'react';

interface BookmarkProps {
  className?: string;
  color?: string;
  filled?: boolean;
  size?: number;
}

const Bookmark = ({
  className,
  color,
  filled = false,
  size = 20,
}: BookmarkProps) => {
  if (filled)
    return (
      <svg
        data-5iu="true"
        data-qa="bookmark-filled"
        aria-hidden="true"
        viewBox="0 0 20 20"
        width={size}
        height={size}
      >
        <path
          className={className}
          fill={color}
          fillRule="evenodd"
          d="M7 1.5a2.75 2.75 0 0 0-2.75 2.75v12.793c0 1.114 1.346 1.671 2.134.884L10 14.31l3.616 3.616c.788.787 2.134.23 2.134-.884V4.25A2.75 2.75 0 0 0 13 1.5z"
          clipRule="evenodd"
        ></path>
      </svg>
    );

  return (
    <svg
      data-5iu="true"
      data-qa="bookmark"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        className={className}
        fill={color}
        fillRule="evenodd"
        d="M4.25 4.25A2.75 2.75 0 0 1 7 1.5h6a2.75 2.75 0 0 1 2.75 2.75v12.793c0 1.114-1.346 1.671-2.134.884L10 14.31l-3.616 3.616c-.788.787-2.134.23-2.134-.884zM7 3c-.69 0-1.25.56-1.25 1.25v12.19l3.649-3.65a.85.85 0 0 1 1.202 0l3.649 3.65V4.25C14.25 3.56 13.69 3 13 3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Bookmark;
