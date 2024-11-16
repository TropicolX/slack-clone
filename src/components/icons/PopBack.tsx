interface PopBackProps {
  className?: string;
}

const PopBack = ({ className }: PopBackProps) => {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path
        className={className}
        fill="currentColor"
        fillRule="evenodd"
        d="M3.25 2A2.25 2.25 0 0 0 1 4.25v11.5A2.25 2.25 0 0 0 3.25 18h13.5A2.25 2.25 0 0 0 19 15.75V4.25A2.25 2.25 0 0 0 16.75 2zM2.5 4.25a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75H9.5v-3.75A1.75 1.75 0 0 0 7.75 11H2.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default PopBack;
