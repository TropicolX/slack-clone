import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useState,
} from 'react';
import {
  DefaultParticipantViewUIProps,
  DefaultScreenShareOverlay,
  hasAudio,
  hasScreenShare,
  MenuToggle,
  ParticipantActionsContextMenu,
  ToggleMenuButtonProps,
  useParticipantViewContext,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import Keep from './icons/Keep';
import MicrophoneOff from './icons/MicrophoneOff';
import MoreVert from './icons/MoreVert';
import SpeechIndicator from './SpeechIndicator';

const ParticipantViewUI = () => {
  const { participant, trackType } = useParticipantViewContext();
  const [showMenu, setShowMenu] = useState(false);

  const { isLocalParticipant, isSpeaking } = participant;
  const isScreenSharing = hasScreenShare(participant);
  const hasAudioTrack = hasAudio(participant);

  if (isLocalParticipant && isScreenSharing && trackType === 'screenShareTrack')
    return (
      <>
        <DefaultScreenShareOverlay />
        <ParticipantDetails />
      </>
    );

  return (
    <>
      <ParticipantDetails />
      {/* Speech Ring */}
      <div
        className={clsx(
          isSpeaking &&
            hasAudioTrack &&
            'ring-[3px] ring-[#fff] shadow-[0_0_8px_5px_#fff]',
          `absolute left-0 top-0 w-full h-full rounded-xl`
        )}
      />
      {/* Menu Overlay */}
      <div
        onMouseOver={() => {
          setShowMenu(true);
        }}
        onMouseOut={() => setShowMenu(false)}
        className={`absolute z-[1] left-0 top-0 w-full h-full rounded-xl bg-transparent`}
      />
      {/* Menu */}
      <div
        onMouseOver={() => setShowMenu(true)}
        className={clsx(
          'z-[999] absolute top-2 right-2',
          showMenu ? 'opacity-100' : 'opacity-0'
        )}
      >
        <MenuToggle
          strategy="fixed"
          placement="bottom-start"
          ToggleButton={OtherMenuToggleButton}
        >
          <ParticipantActionsContextMenu />
        </MenuToggle>
      </div>
    </>
  );
};

const ParticipantDetails = ({}: Pick<
  DefaultParticipantViewUIProps,
  'indicatorsVisible'
>) => {
  const { participant } = useParticipantViewContext();
  const { pin, name, userId, isSpeaking, isDominantSpeaker } = participant;
  const hasAudioTrack = hasAudio(participant);
  const pinned = !!pin;

  return (
    <>
      <div className="z-1 absolute left-2 bottom-2 w-full pr-4 flex items-end justify-between cursor-default select-none">
        <span
          className={clsx(
            'flex items-center h-7 gap-1 py-1 px-2 rounded-full text-[13px] leading-[1.38463] font-bold',
            isSpeaking ? 'bg-[#fff] text-[#212428]' : 'bg-[#212428] text-white'
          )}
        >
          {!hasAudioTrack && (
            <span>
              <MicrophoneOff size={20} />
            </span>
          )}
          {hasAudioTrack && isSpeaking && (
            <div className="w-6.5 h-6.5 flex items-center justify-center bg-primary rounded-full">
              <SpeechIndicator
                isSpeaking={isSpeaking}
                isDominantSpeaker={isDominantSpeaker}
              />
            </div>
          )}
          <span>{name || userId}</span>
        </span>
        {pinned && (
          <div className="w-8 h-8 flex items-center justify-center bg-[#fff] rounded-lg">
            <Keep />
          </div>
        )}
      </div>
    </>
  );
};

const Button = forwardRef(function Button(
  {
    icon,
    onClick = () => null,
    ...rest
  }: {
    icon: ReactNode;
    onClick?: () => void;
  } & ComponentProps<'button'> & { menuShown?: boolean },
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
      {...rest}
      ref={ref}
      className="h-8 w-8 rounded-lg flex items-center justify-center bg-[#fff] hover:bg-[#fff] border-[#fff]"
    >
      {icon}
    </button>
  );
});

const OtherMenuToggleButton = forwardRef<
  HTMLButtonElement,
  ToggleMenuButtonProps
>(function ToggleButton(props, ref) {
  return (
    <Button {...props} title="More options" ref={ref} icon={<MoreVert />} />
  );
});

export default ParticipantViewUI;
