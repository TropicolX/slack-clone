import React from 'react';

interface MicrophoneOffProps {
  size?: number;
}

const MicrophoneOff = ({ size }: MicrophoneOffProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.35086 10.3436C5.12445 9.77312 5 9.15109 5 8.5V8.25C5 7.83579 4.66421 7.5 4.25 7.5C3.83579 7.5 3.5 7.83579 3.5 8.25V8.5C3.5 9.60794 3.7772 10.6511 4.26603 11.564L5.35086 10.3436ZM7.62904 14.554C8.36362 14.8419 9.16335 15 10 15C13.5899 15 16.5 12.0899 16.5 8.5V8.25C16.5 7.83579 16.1642 7.5 15.75 7.5C15.3358 7.5 15 7.83579 15 8.25V8.5C15 11.2614 12.7614 13.5 10 13.5C9.55549 13.5 9.12453 13.442 8.71427 13.3331L7.62904 14.554Z"
        fill="currentColor"
      ></path>
      <path
        d="M10 14.25V17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M12.25 17.25L7.75 17.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M12.1271 2.72031C11.5376 2.2685 10.8001 2 10 2C8.067 2 6.5 3.567 6.5 5.5V8.5C6.5 8.67302 6.51255 8.84311 6.5368 9.0094L8 7.3633V5.5C8 4.39543 8.89543 3.5 10 3.5C10.4175 3.5 10.8051 3.62793 11.1258 3.84674L12.1271 2.72031ZM9.90052 11.9986C9.93357 11.9995 9.96673 12 10 12C11.933 12 13.5 10.433 13.5 8.5V7.9492L9.90052 11.9986Z"
        fill="currentColor"
      ></path>
      <path
        d="M4 15.25L15.5 2.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};

export default MicrophoneOff;
