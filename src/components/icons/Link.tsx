import React from 'react';

interface LinkProps {
  color: string;
  size?: number;
}

const Link = ({ color, size = 18 }: LinkProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="link"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M12.306 3.756a2.75 2.75 0 0 1 3.889 0l.05.05a2.75 2.75 0 0 1 0 3.889l-3.18 3.18a2.75 2.75 0 0 1-3.98-.095l-.03-.034a.75.75 0 0 0-1.11 1.009l.03.034a4.25 4.25 0 0 0 6.15.146l3.18-3.18a4.25 4.25 0 0 0 0-6.01l-.05-.05a4.25 4.25 0 0 0-6.01 0L9.47 4.47a.75.75 0 1 0 1.06 1.06zm-4.611 12.49a2.75 2.75 0 0 1-3.89 0l-.05-.051a2.75 2.75 0 0 1 0-3.89l3.18-3.179a2.75 2.75 0 0 1 3.98.095l.03.034a.75.75 0 1 0 1.11-1.01l-.03-.033a4.25 4.25 0 0 0-6.15-.146l-3.18 3.18a4.25 4.25 0 0 0 0 6.01l.05.05a4.25 4.25 0 0 0 6.01 0l1.775-1.775a.75.75 0 0 0-1.06-1.06z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Link;
