import React from 'react';

interface MicrophoneProps {
  color?: string;
  size?: number;
}

const Microphone = ({ color, size = 18 }: MicrophoneProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="microphone"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M10 2a3.5 3.5 0 0 0-3.5 3.5v3a3.5 3.5 0 1 0 7 0v-3A3.5 3.5 0 0 0 10 2M8 5.5a2 2 0 1 1 4 0v3a2 2 0 1 1-4 0zM5 8.25a.75.75 0 0 0-1.5 0v.25a6.5 6.5 0 0 0 5.75 6.457V16.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.543A6.5 6.5 0 0 0 16.5 8.5v-.25a.75.75 0 0 0-1.5 0v.25a5 5 0 0 1-10 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Microphone;
