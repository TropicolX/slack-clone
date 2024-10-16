import React from 'react';

interface SendProps {
  color: string;
  filled?: boolean;
  size?: number;
}

const Send = ({ color, filled = false, size = 20 }: SendProps) => {
  if (filled)
    return (
      <svg
        data-ebo="true"
        data-qa="send-filled"
        aria-hidden="true"
        viewBox="0 0 20 20"
        width={size}
        height={size}
      >
        <path
          fill={color}
          d="M1.5 2.25a.755.755 0 0 1 1-.71l15.596 7.808a.73.73 0 0 1 0 1.305L2.5 18.462l-.076.018a.75.75 0 0 1-.924-.728v-4.54c0-1.21.97-2.229 2.21-2.25l6.54-.17c.27-.01.75-.24.75-.79s-.5-.79-.75-.79l-6.54-.17A2.253 2.253 0 0 1 1.5 6.79z"
        ></path>
      </svg>
    );

  return (
    <svg
      data-ebo="true"
      data-qa="send"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M1.856 1.612a.75.75 0 0 1 .73-.033l15.5 7.75a.75.75 0 0 1 0 1.342l-15.5 7.75A.75.75 0 0 1 1.5 17.75v-6.046c0-.68.302-1.29.78-1.704a2.25 2.25 0 0 1-.78-1.704V2.25a.75.75 0 0 1 .356-.638M3 3.464v4.832a.75.75 0 0 0 .727.75l6.546.204a.75.75 0 0 1 0 1.5l-6.546.204a.75.75 0 0 0-.727.75v4.833L16.073 10z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Send;
