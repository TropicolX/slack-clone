import { CallingState, StreamTheme } from '@stream-io/video-react-sdk';

import Avatar from './Avatar';
import Hash from './icons/Hash';
import HuddleUI from './HuddleUI';
import useHuddle from '../hooks/useHuddle';

interface HuddleProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const Huddle = ({ isModalOpen, setIsModalOpen }: HuddleProps) => {
  const { call, customData, callingState, buttonsDisabled } = useHuddle();

  const joinCall = () => {
    call?.join();
  };

  const declineCall = () => {
    call?.leave({
      reject: true,
    });
  };

  if (!call) return null;

  switch (true) {
    case callingState === CallingState.RINGING && call.isCreatedByMe:
    default:
      return null;
    case callingState === CallingState.JOINED ||
      callingState === CallingState.JOINING:
      return (
        <HuddleUI
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isSidebar
        />
      );
    case callingState === CallingState.RINGING && !call.isCreatedByMe:
      return (
        <StreamTheme>
          <div className="absolute pr-4 bottom-2 left-2 w-full">
            <div className="w-full max-w-[340px] p-3 bg-[#101214] rounded-xl overflow-hidden border border-[#797c814d]">
              <div className="flex items-start text-[15px]">
                <div className="grow shrink-0 mr-2">
                  <Avatar
                    width={20}
                    borderRadius={6}
                    data={{
                      name: customData.createdBy,
                      image: customData.createdByUserImage,
                    }}
                  />
                </div>
                <p className="-mt-0.5">
                  <b>{customData.createdBy}</b> is inviting you to a huddle in
                  <span className="w-[15px] h-[15px] inline-block pt-0.5 mx-1">
                    <Hash size={15} color="var(--primary)" />
                    {'  '}
                  </span>
                  <b>{customData.channelName}</b>
                </p>
              </div>
              <div className="mt-3 flex flex-col items-center gap-1.5">
                <button
                  onClick={joinCall}
                  disabled={buttonsDisabled}
                  className="w-full h-[26px] rounded-lg border border-[#e0e0e0] bg-[#e0e0e0] px-3 text-[13px] text-[#101214] font-bold"
                >
                  Join
                </button>
                <button
                  onClick={declineCall}
                  disabled={buttonsDisabled}
                  className="w-full h-[26px] rounded-lg border border-[#f8f8f840] bg-[#f8f8f840] hover:bg-[#696a6b] hover:border-[#696a6b] px-3 text-[13px] text-[#e0e0e0cc] font-bold"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </StreamTheme>
      );
  }
};

export default Huddle;
