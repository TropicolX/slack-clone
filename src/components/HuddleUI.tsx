import {
  StreamTheme,
  PaginatedGridLayout,
  SpeakerLayout,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import CallControlButton from './CallControlButton';
import Desktop from './icons/Desktop';
import Emoji from './icons/Emoji';
import IconButton from './IconButton';
import Microphone from './icons/Microphone';
import MicrophoneOff from './icons/MicrophoneOff';
import MoreVert from './icons/MoreVert';
import OpenInWindow from './icons/OpenInWindow';
import ParticipantViewUI from './ParticipantViewUI';
import PopBack from './icons/PopBack';
import Signal from './icons/Signal';
import UserAdd from './icons/UserAdd';
import Video from './icons/Video';
import VideoOff from './icons/VideoOff';
import useHuddle from '../hooks/useHuddle';

interface HuddleUIProps {
  isModalOpen?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isSidebar?: boolean;
}

const HuddleUI = ({
  isSidebar = false,
  isModalOpen = false,
  setIsModalOpen,
}: HuddleUIProps) => {
  const {
    customData,
    isMicrophoneMute,
    isCameraMute,
    hasMicrophonePermission,
    hasCameraPermission,
    leaveCall,
    toggleMicrophone,
    toggleCamera,
    toggleScreenShare,
    width,
    huddleRef,
    buttonsDisabled,
    screenShare,
    isSpeakerLayout,
  } = useHuddle();

  const enableScreenShare = async () => {
    try {
      setIsModalOpen(true);
      await screenShare.enable();
    } catch (error) {
      console.error(error);
    }
  };

  const windowToggle = () => {
    if (isSidebar) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <StreamTheme className={clsx('huddle', isSidebar && 'huddle--sidebar')}>
      <div
        className={clsx(
          'w-full',
          isSidebar && 'absolute pr-4 bottom-2 left-2',
          !isSidebar && 'block'
        )}
      >
        <div
          ref={huddleRef}
          className={clsx(
            'bg-theme-gradient flex flex-col w-full rounded-xl',
            isSidebar && 'max-w-[340px] max-h-[340px]',
            !isSidebar && 'h-full'
          )}
        >
          <div className="flex flex-col px-1 items-center justify-center">
            <div className="flex my-2 pr-2 w-full items-center justify-start">
              <div className="flex items-center mr-auto">
                <div className="ml-1 mr-1">
                  <Signal />
                </div>
                <button className="w-full flex items-center text-[14.8px] hover:underline">
                  <span className="break-all whitespace-break-spaces line-clamp-1">
                    {isModalOpen && isSidebar
                      ? 'Viewing in another window'
                      : customData?.channelName}
                  </span>
                </button>
              </div>
              <IconButton
                icon={
                  isModalOpen ? (
                    <PopBack />
                  ) : (
                    <OpenInWindow className="fill-icon-gray group-hover:fill-white" />
                  )
                }
                className="w-[30px] h-[30px]"
                onClick={windowToggle}
                disabled={isModalOpen && isSidebar}
              />
            </div>
          </div>
          {((!isModalOpen && isSidebar) || (isModalOpen && !isSidebar)) && (
            <div
              className={clsx(
                'grow shrink-0 mx-1 relative flex items-center justify-center overflow-hidden',
                isSidebar && 'h-[240px]',
                !isSidebar && 'h-[calc(45svw-100px)] max-h-[620px]'
              )}
            >
              <div className="relative z-10 flex items-center justify-center w-full">
                {(!isSpeakerLayout || (isSpeakerLayout && isSidebar)) && (
                  <PaginatedGridLayout
                    groupSize={isSidebar ? 2 : 6}
                    ParticipantViewUI={ParticipantViewUI}
                  />
                )}
                {isSpeakerLayout && !isSidebar && (
                  <SpeakerLayout
                    ParticipantViewUIBar={ParticipantViewUI}
                    ParticipantViewUISpotlight={ParticipantViewUI}
                    participantsBarLimit={3}
                    participantsBarPosition="bottom"
                  />
                )}
              </div>
              <div className="absolute w-full h-full overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://a.slack-edge.com/27f87ff/img/huddles/gradient_01.png"
                  alt="huddle-background"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <div
            className={clsx(
              'flex items-center h-[52px] px-2',
              isSidebar ? 'justify-between gap-2' : 'justify-center gap-4'
            )}
          >
            <div
              className={clsx(
                'flex items-center',
                isSidebar ? 'gap-1.5' : 'gap-2'
              )}
            >
              <CallControlButton
                icon={
                  isMicrophoneMute ? (
                    <MicrophoneOff size={20} />
                  ) : (
                    <Microphone size={20} />
                  )
                }
                title={isMicrophoneMute ? 'Unmute mic' : 'Mute mic'}
                active={!isMicrophoneMute}
                onClick={toggleMicrophone}
                disabled={!hasMicrophonePermission || buttonsDisabled}
              />
              {width > 0 && width >= 220 && (
                <CallControlButton
                  icon={
                    isCameraMute ? <VideoOff size={20} /> : <Video size={20} />
                  }
                  title={isCameraMute ? 'Turn on video' : 'Turn off video'}
                  active={!isCameraMute}
                  onClick={toggleCamera}
                  disabled={!hasCameraPermission || buttonsDisabled}
                />
              )}
              {width > 0 && width >= 260 && (
                <CallControlButton
                  icon={<Desktop size={20} />}
                  onClick={isSidebar ? enableScreenShare : toggleScreenShare}
                  title={'Share screen'}
                  disabled={buttonsDisabled}
                />
              )}
              {width > 0 && width >= 300 && (
                <CallControlButton
                  icon={<Emoji size={20} />}
                  title={'Send a reaction'}
                />
              )}
              {width > 0 && width >= 340 && (
                <CallControlButton
                  icon={<UserAdd size={20} />}
                  title={'Invite people'}
                />
              )}
              <CallControlButton
                icon={<MoreVert size={20} />}
                title={'More options'}
              />
            </div>
            <button
              onClick={() => {
                leaveCall();
                setIsModalOpen(false);
              }}
              disabled={buttonsDisabled}
              className="flex items-center justify-center min-w-[64px] h-[36px] px-3 pb-[1px] text-[13px] border border-[#b41541] bg-[#b41541] hover:shadow-[0_1px_4px_#0000004d] hover:bg-blend-lighten hover:bg-[linear-gradient(#d8f5e914,#d8f5e914)] font-bold select-none text-white rounded-lg disabled:bg-gray-400 disabled:text-white disabled:border-gray-400"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </StreamTheme>
  );
};

export default HuddleUI;
