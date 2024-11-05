import { ReactNode } from 'react';

import Spinner from './Spinner';

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
      {loading && <Spinner />}
    </button>
  );
};

export default Button;
