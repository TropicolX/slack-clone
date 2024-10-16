import React from 'react';

interface MessagesProps {
  color: string;
  filled?: boolean;
  size?: number;
}

const Messages = ({ color, filled = false, size = 20 }: MessagesProps) => {
  if (filled)
    return (
      <svg
        data-ebo="true"
        data-qa="direct-messages-filled"
        aria-hidden="true"
        viewBox="0 0 20 20"
        width={size}
        height={size}
      >
        <path
          fill={color}
          fillRule="evenodd"
          d="M12.25 1.5a6.25 6.25 0 0 0-6.207 5.516Q6.269 7 6.5 7a6.5 6.5 0 0 1 6.484 6.957 6.2 6.2 0 0 0 1.867-.522l2.752.55a.75.75 0 0 0 .882-.882l-.55-2.752A6.25 6.25 0 0 0 12.25 1.5m-.75 12a5 5 0 1 0-9.57 2.03l-.415 2.073a.75.75 0 0 0 .882.882l2.074-.414a5 5 0 0 0 7.03-4.57"
          clipRule="evenodd"
        ></path>
      </svg>
    );

  return (
    <svg
      data-ebo="true"
      data-qa="direct-messages"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M7.675 6.468a4.75 4.75 0 1 1 8.807 3.441.75.75 0 0 0-.067.489l.379 1.896-1.896-.38a.75.75 0 0 0-.489.068 5 5 0 0 1-.648.273.75.75 0 1 0 .478 1.422q.314-.105.611-.242l2.753.55a.75.75 0 0 0 .882-.882l-.55-2.753A6.25 6.25 0 1 0 6.23 6.064a.75.75 0 1 0 1.445.404M6.5 8.5a5 5 0 0 0-4.57 7.03l-.415 2.073a.75.75 0 0 0 .882.882l2.074-.414A5 5 0 1 0 6.5 8.5m-3.5 5a3.5 3.5 0 1 1 1.91 3.119.75.75 0 0 0-.49-.068l-1.214.243.243-1.215a.75.75 0 0 0-.068-.488A3.5 3.5 0 0 1 3 13.5"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Messages;
