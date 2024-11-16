import HuddleUI from './HuddleUI';

interface HuddleModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const HuddleModal = ({ isModalOpen, setIsModalOpen }: HuddleModalProps) => {
  if (!isModalOpen) return null;

  return (
    <div className="z-[9999] fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-[#0009] px-4 py-5">
      <div className="flex flex-col w-[80svw] max-w-[1280px] h-[45svw] max-h-[720px] rounded-lg bg-[#1a1d21] border border-[#797c8126] shadow-[0_0_0_1px_rgba(29,28,29,.13),0_18px_48px_0_#00000059]">
        <HuddleUI isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default HuddleModal;
