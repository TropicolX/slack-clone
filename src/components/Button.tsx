import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const Button = ({
  children,
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  variant = 'primary',
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={
        'min-w-[82.55px] flex items-center justify-center p-4 font-bold rounded text-[13.8px] tracking-[.057em] uppercase transition-all duration-300 ease-out disabled:bg-[#dddddd] disabled:border-[#dddddd] disabled:hover:bg-[#dddddd] disabled:hover:border-[#dddddd] disabled:text-[#1d1c1dbf] ' +
        (variant === 'primary'
          ? 'text-[#fff] bg-[#611f69] border-[#611f69] hover:bg-[#4a154b] border hover:border-[#4a154b] '
          : 'text-[#611f69] bg-[#fff] shadow-[inset_0_0_0_1px_#611f69] hover:shadow-[inset_0_0_0_2px_#611f69] ') +
        className
      }
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {!loading && children}
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="white"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="white"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default Button;
