import { ComponentType, ReactNode } from 'react';
import clsx from 'clsx';

export interface SidebarButtonProps {
  active?: boolean;
  boldText?: boolean;
  className?: string;
  icon: ComponentType<{ color: string; size: number }>;
  iconSize?: 'md' | 'lg';
  onClick?: () => void;
  title?: string;
}

const SidebarButton = ({
  active = false,
  boldText = false,
  className,
  icon: Icon,
  iconSize = 'md',
  onClick,
  title,
}: SidebarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'pl-4 pr-2.5 h-7 leading-7 rounded-md cursor-pointer inline-flex items-center text-sidebar-gray disabled:bg-transparent [&_path]:disabled:fill-[#8a8b8d]',
        active ? 'bg-[#f8f8f840]' : 'hover:bg-hover-gray',
        className
      )}
    >
      <span className="inline-flex item-center justify-center -ml-1 mr-2">
        <Icon
          size={iconSize === 'md' ? 16 : 20}
          color={active ? 'var(--primary)' : 'var(--secondary)'}
        />
      </span>
      <span
        className={clsx(
          'text-[15px] truncate',
          (active || boldText) && 'text-white',
          boldText && 'font-extrabold'
        )}
      >
        {title}
      </span>
    </button>
  );
};

export default SidebarButton;
