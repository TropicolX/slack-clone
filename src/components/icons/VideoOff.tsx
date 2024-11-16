import React from 'react';

interface VideoOffProps {
  size?: number;
}

const VideoOff = ({ size }: VideoOffProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6694 6.44613L13.0988 8.21302C13.1635 8.32628 13.2578 8.42265 13.3746 8.4902C13.6064 8.62424 13.8922 8.62449 14.1242 8.49088L17.5 6.54725V13.4528L14.1242 11.5091C13.8922 11.3755 13.6064 11.3758 13.3746 11.5098C13.1428 11.6438 13 11.8913 13 12.1591V14.75C13 15.1642 12.6642 15.5 12.25 15.5H6.62151L5.28818 17H12.25C13.4926 17 14.5 15.9926 14.5 14.75V13.4563L17.1263 14.9684C17.9596 15.4482 19 14.8468 19 13.8852V6.11483C19 5.15324 17.9596 4.55176 17.1263 5.03155L14.6694 6.44613ZM1.5 14.4883V5.25C1.5 4.00736 2.50736 3 3.75 3H11.7118L10.3785 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V12.8008L1.5 14.4883Z"
        fill="currentColor"
      ></path>
      <path
        d="M2 17.25L15.5 2.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};

export default VideoOff;
