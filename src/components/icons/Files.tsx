import React from 'react';

interface FilesProps {
  className?: string;
  color?: string;
  size?: number;
}

const Files = ({ className, color, size = 16 }: FilesProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="file-browser"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        className={className}
        fillRule="evenodd"
        d="M8.86 1.328a2.15 2.15 0 0 1 2.28 0l6.118 3.824a1.59 1.59 0 0 1 0 2.696l-6.118 3.824a2.15 2.15 0 0 1-2.28 0L2.742 7.848a1.59 1.59 0 0 1 0-2.696zM10.345 2.6a.65.65 0 0 0-.69 0L3.537 6.424a.09.09 0 0 0 0 .152L9.655 10.4a.65.65 0 0 0 .69 0l6.118-3.824a.09.09 0 0 0 0-.152zm-8.246 7.462a.75.75 0 0 1 1.033-.239L9.655 13.9a.65.65 0 0 0 .688.001l6.519-4.074a.75.75 0 0 1 .795 1.272l-6.52 4.074a2.15 2.15 0 0 1-2.277 0l-6.523-4.078a.75.75 0 0 1-.238-1.033m1.033 3.261a.75.75 0 1 0-.795 1.272l6.523 4.077a2.15 2.15 0 0 0 2.278.001l6.519-4.074a.75.75 0 0 0-.795-1.272l-6.52 4.074a.65.65 0 0 1-.687 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Files;
