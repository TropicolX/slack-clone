import React from 'react';

interface DownloadProps {
  className?: string;
}

const Download = ({ className }: DownloadProps) => {
  return (
    <svg viewBox="0 0 20 20" width={20} height={20}>
      <path
        fill="currentColor"
        className={className}
        fillRule="evenodd"
        d="M11.75 4a3.75 3.75 0 0 0-3.512 2.432.75.75 0 0 1-.941.447 2.5 2.5 0 0 0-2.937 3.664.75.75 0 0 1-.384 1.093A2.251 2.251 0 0 0 4.75 16h9.5a3.25 3.25 0 0 0 1.44-6.164.75.75 0 0 1-.379-.908A3.75 3.75 0 0 0 11.75 4M7.108 5.296a5.25 5.25 0 0 1 9.786 3.508A4.75 4.75 0 0 1 14.25 17.5h-9.5a3.75 3.75 0 0 1-2.02-6.91 4 4 0 0 1 4.378-5.294M10.25 7.5a.75.75 0 0 1 .75.75v3.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V8.25a.75.75 0 0 1 .75-.75"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Download;
