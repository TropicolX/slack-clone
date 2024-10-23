import { ReactNode } from 'react';
import clsx from 'clsx';

export interface RailButtonProps {
  active?: boolean;
  icon: ReactNode;
  onClick?: () => void;
  title?: string;
  className?: string;
}

const RailButton = ({
  active = false,
  icon,
  onClick,
  title,
  className,
}: RailButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full group py-2 cursor-pointer flex flex-col gap-1 text-center text-[11px] leading-3 font-bold items-center justify-center [&_svg]:transition-all [&_svg]:hover:scale-[1.2]',
        className
      )}
    >
      <div
        className={clsx(
          'w-9 h-9 flex items-center justify-center transition-[background] duration-[125ms] ease-[cubic-bezier(.17,.67,.55,1.09)] group-hover:bg-[#f8f8f840] rounded-lg',
          active && 'bg-[#f8f8f840]',
          !active && 'bg-transparent'
        )}
      >
        {icon}
      </div>
      <div>{title}</div>
    </button>
  );
};

export default RailButton;
