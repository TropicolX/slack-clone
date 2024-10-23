import { ReactNode } from 'react';
import clsx from 'clsx';

export interface IconButtonProps {
  disabled?: boolean;
  icon: ReactNode;
  onClick?: () => void;
  // variant?: 'primary' | 'secondary';
  title?: string;
  className?: string;
}

const IconButton = ({
  disabled,
  icon,
  onClick,
  // variant = 'primary',
  title,
  className,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={clsx(
        'p-[3px] m-[1px] rounded cursor-pointer inline-flex items-center justify-center hover:bg-[#f8f8f840] disabled:bg-transparent [&_path]:disabled:fill-[#8a8b8d]',
        className
      )}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;
