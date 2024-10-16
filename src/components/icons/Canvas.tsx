import React from 'react';

interface CanvasProps {
  color: string;
  size?: number;
}

const Canvas = ({ color, size = 16 }: CanvasProps) => {
  return (
    <svg
      data-5iu="true"
      data-qa="canvas-content"
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M3 5.25A2.25 2.25 0 0 1 5.25 3h9.5A2.25 2.25 0 0 1 17 5.25v5.5h-4.75a1.5 1.5 0 0 0-1.5 1.5V17h-5.5A2.25 2.25 0 0 1 3 14.75zm9.25 11.003 4.003-4.003H12.25zM5.25 1.5A3.75 3.75 0 0 0 1.5 5.25v9.5a3.75 3.75 0 0 0 3.75 3.75h5.736c.729 0 1.428-.29 1.944-.805l4.765-4.765a2.75 2.75 0 0 0 .805-1.944V5.25a3.75 3.75 0 0 0-3.75-3.75zm.25 4.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75m.75 2.25a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Canvas;
