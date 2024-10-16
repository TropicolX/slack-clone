import React from 'react';

interface MessageProps {
  color: string;
  size?: number;
}

const Message = ({ color, size = 16 }: MessageProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="message-filled"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M10 1.5a8.5 8.5 0 1 0 3.859 16.075l3.714.904a.75.75 0 0 0 .906-.906l-.904-3.714A8.5 8.5 0 0 0 10 1.5"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Message;
