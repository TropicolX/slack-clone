import { ReactNode, useRef } from 'react';

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
  loading?: boolean;
}

const Modal = ({
  children,
  loading = false,
  open,
  onClose,
  title,
}: ModalProps) => {
  const modal = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`z-[9999] fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-[#0009] px-4 py-5 ${
        open ? 'block' : 'hidden'
      }`}
    >
      <div
        ref={modal}
        className="flex flex-col w-full max-w-[580px] rounded-lg bg-[#1a1d21] border border-[#797c8126] shadow-[0_0_0_1px_rgba(29,28,29,.13),0_18px_48px_0_#00000059] px-7 py-5"
      >
        <div className="pb-[18px] flex items-center justify-between">
          <h3 className="text-xl font-semibold sm:text-2xl">{title}</h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="group w-9 h-9 -mr-2 rounded-lg flex ml-2 items-center justify-center hover:bg-[#d1d2d30b]"
          >
            <svg
              data-0ko="true"
              data-qa="close"
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="w-5 h-5"
            >
              <path
                fill="currentColor"
                className="fill-[#e8e8e8b3] group-hover:fill-channel-gray"
                fillRule="evenodd"
                d="M16.53 3.47a.75.75 0 0 1 0 1.06L11.06 10l5.47 5.47a.75.75 0 0 1-1.06 1.06L10 11.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L8.94 10 3.47 4.53a.75.75 0 0 1 1.06-1.06L10 8.94l5.47-5.47a.75.75 0 0 1 1.06 0"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
