import React from 'react';

interface NumberedListProps {
  color: string;
  size?: number;
}

const NumberedList = ({ color, size = 18 }: NumberedListProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="numbered-list"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M3.792 2.094A.5.5 0 0 1 4 2.5V6h1a.5.5 0 1 1 0 1H2a.5.5 0 1 1 0-1h1V3.194l-.842.28a.5.5 0 0 1-.316-.948l1.5-.5a.5.5 0 0 1 .45.068M7.75 3.5a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5zM7 10.75a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5h-10a.75.75 0 0 1-.75-.75m0 6.5a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5h-10a.75.75 0 0 1-.75-.75m-4.293-3.36a1 1 0 0 1 .793-.39c.49 0 .75.38.75.75 0 .064-.033.194-.173.409a5 5 0 0 1-.594.711c-.256.267-.552.548-.87.848l-.088.084a42 42 0 0 0-.879.845A.5.5 0 0 0 2 18h3a.5.5 0 0 0 0-1H3.242l.058-.055c.316-.298.629-.595.904-.882a6 6 0 0 0 .711-.859c.18-.277.335-.604.335-.954 0-.787-.582-1.75-1.75-1.75a2 2 0 0 0-1.81 1.147.5.5 0 1 0 .905.427 1 1 0 0 1 .112-.184"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default NumberedList;
