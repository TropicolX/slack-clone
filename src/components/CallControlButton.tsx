import clsx from 'clsx';
import IconButton, { IconButtonProps } from './IconButton';

type CallControlButtonProps = Omit<IconButtonProps, 'variant'> & {
  active?: boolean;
};

const CallControlButton = ({
  active = false,
  // alert,
  className,
  icon,
  onClick,
  title,
}: CallControlButtonProps) => {
  return (
    <IconButton
      // variant="secondary"
      // alert={alert}
      icon={icon}
      title={title}
      className={clsx(
        'w-9 h-9 !m-0 !p-0 rounded-full',
        active && 'bg-[#e0e0e0] hover:bg-[#e0e0e0] [&_path]:fill-[#101214]',
        !active &&
          'bg-[#f8f8f840] [&_path]:fill-[#e0e0e0cc] hover:bg-[#696a6b] [&_path]:hover:fill-white',
        className
      )}
      onClick={onClick}
    />
  );
};

export default CallControlButton;
