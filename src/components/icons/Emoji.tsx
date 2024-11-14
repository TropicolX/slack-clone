import React from 'react';

interface EmojiProps {
  color?: string;
  size?: number;
}

const Emoji = ({ color, size = 18 }: EmojiProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="emoji"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M2.5 10a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18M7.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M14 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-6.385 3.766a.75.75 0 1 0-1.425.468C6.796 14.08 8.428 15 10.027 15s3.23-.92 3.838-2.766a.75.75 0 1 0-1.425-.468c-.38 1.155-1.38 1.734-2.413 1.734s-2.032-.58-2.412-1.734"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Emoji;
