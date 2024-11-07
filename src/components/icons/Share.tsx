import React from 'react';

interface ShareProps {
  className?: string;
  color?: string;
  size?: number;
}

const Share = ({ className, color, size = 18 }: ShareProps) => {
  return (
    <svg
      data-ebo="true"
      data-qa="share-message"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        className={className}
        fill={color}
        fillRule="evenodd"
        d="M10.457 2.56a.75.75 0 0 1 .814.15l7 6.75a.75.75 0 0 1 0 1.08l-7 6.75A.75.75 0 0 1 10 16.75V13.5H6c-1.352 0-2.05.389-2.43.832-.4.465-.57 1.133-.57 1.918a.75.75 0 0 1-1.5 0V14c0-2.594.582-4.54 2-5.809C4.898 6.941 6.944 6.5 9.5 6.5h.5V3.25c0-.3.18-.573.457-.69M3.052 12.79C3.777 12.278 4.753 12 6 12h4.75a.75.75 0 0 1 .75.75v2.235L16.67 10 11.5 5.015V7.25a.75.75 0 0 1-.75.75H9.5c-2.444 0-4.023.434-5 1.309-.784.702-1.29 1.788-1.448 3.481"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Share;
