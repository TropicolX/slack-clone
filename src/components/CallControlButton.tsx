import clsx from 'clsx';
import { IconButtonProps } from './IconButton';

type CallControlButtonProps = Omit<IconButtonProps, 'variant'> & {
  active?: boolean;
};

const CallControlButton = ({
  active = false,
  className,
  icon,
  onClick,
  title,
}: CallControlButtonProps) => {
  return (
    <button
      title={title}
      className={clsx(
        'w-9 h-9 rounded-full inline-flex items-center justify-center',
        active && 'bg-[#e0e0e0] hover:bg-[#e0e0e0] [&_path]:fill-[#101214]',
        !active &&
          'bg-[#f8f8f840] [&_path]:fill-[#e0e0e0cc] hover:bg-[#696a6b] [&_path]:hover:fill-white',
        className
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default CallControlButton;
