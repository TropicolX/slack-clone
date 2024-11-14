import React from 'react';

interface VideoProps {
  color?: string;
  size?: number;
}

const Video = ({ color, size = 18 }: VideoProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="video"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M3.75 4.5a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-2.59a.75.75 0 0 1 1.124-.65l3.376 1.943V6.547l-3.376 1.944A.75.75 0 0 1 13 7.84V5.25a.75.75 0 0 0-.75-.75zm-2.25.75A2.25 2.25 0 0 1 3.75 3h8.5a2.25 2.25 0 0 1 2.25 2.25v1.294l2.626-1.512A1.25 1.25 0 0 1 19 6.115v7.77a1.25 1.25 0 0 1-1.874 1.083L14.5 13.456v1.294A2.25 2.25 0 0 1 12.25 17h-8.5a2.25 2.25 0 0 1-2.25-2.25z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Video;
