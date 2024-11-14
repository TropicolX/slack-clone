import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  RingingCall,
  CallingState,
  useCall,
  useCallStateHooks,
  PaginatedGridLayout,
  StreamTheme,
  OwnCapability,
} from '@stream-io/video-react-sdk';

import { AppContext } from '../app/client/layout';
import Avatar from './Avatar';
import CallControlButton from './CallControlButton';
import IconButton from './IconButton';
import Microphone from './icons/Microphone';
import OpenInWindow from './icons/OpenInWindow';
import Signal from './icons/Signal';
import Video from './icons/Video';
import Emoji from './icons/Emoji';
import UserAdd from './icons/UserAdd';
import MoreVert from './icons/MoreVert';
import Desktop from './icons/Desktop';

const Huddle = () => {
  const call = useCall();

  if (!call) return null;

  const { channel } = useContext(AppContext);
  const { useCallCallingState, useCallCustomData } = useCallStateHooks();
  const callingState = useCallCallingState();
  const customData = useCallCustomData();

  const [width, setWidth] = useState(0);
  const huddleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!huddleRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(huddleRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [huddleRef]);

  const callingToActiveChannel = channel?.id === customData.channelId;

  const leaveCall = useCallback(async () => {
    const canEndCall = call?.permissionsContext.hasPermission(
      OwnCapability.END_CALL
    );

    if (canEndCall) {
      await call.endCall();
    } else {
      await call.leave();
    }
  }, [call]);

  const joinCall = () => {
    call.join();
  };

  const declineCall = () => {
    call.leave({
      reject: true,
    });
  };

  // console.log(callingToActiveChannel);
  // console.log(call);

  const buttonsDisabled = callingState === CallingState.JOINING;

  switch (true) {
    case callingState === CallingState.RINGING && !callingToActiveChannel:
      return null;
    case callingState === CallingState.JOINED ||
      callingState === CallingState.JOINING:
      return (
        <StreamTheme>
          <div className="absolute pr-4 bottom-2 left-2 w-full">
            <div
              ref={huddleRef}
              className="bg-theme-gradient flex flex-col w-full max-w-[340px] rounded-xl"
            >
              <div className="flex flex-col px-1 items-center justify-center">
                <div className="flex my-2 pr-2 w-full items-center justify-start">
                  <div className="flex items-center mr-auto">
                    <div className="ml-1 mr-1">
                      <Signal />
                    </div>
                    <button className="w-full flex items-center text-[14.8px] hover:underline">
                      <span className="break-all whitespace-break-spaces line-clamp-1">
                        {customData.channelName}
                      </span>
                    </button>
                  </div>
                  <IconButton
                    icon={
                      <OpenInWindow className="fill-icon-gray group-hover:fill-white" />
                    }
                    className="w-[30px] h-[30px]"
                  />
                </div>
              </div>
              <div className="mx-1 relative flex items-center justify-center min-h-[82px] overflow-hidden">
                <div className="z-10 flex items-center justify-center">
                  <Avatar
                    width={40}
                    borderRadius={4}
                    fontSize={20}
                    fontWeight={700}
                    data={{ name: 'Lisk Feng', image: '' }}
                  />
                </div>
                <div className="absolute w-full h-full overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://a.slack-edge.com/f06881b/img/huddles/LiskFeng-Star_Gazing-preview.jpg"
                    alt="huddle-background"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between h-[52px] px-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <CallControlButton
                    icon={<Microphone size={20} />}
                    title={'Mute mic'}
                    active
                  />
                  {width > 0 && width >= 220 && (
                    <CallControlButton
                      icon={<Video size={20} />}
                      title={'Turn on Video'}
                    />
                  )}
                  {width > 0 && width >= 260 && (
                    <CallControlButton
                      icon={<Desktop size={20} />}
                      // onClick={toggleScreenShare}
                      title={'Share screen'}
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
                  onClick={leaveCall}
                  disabled={buttonsDisabled}
                  className="flex items-center justify-center min-w-[64px] h-[36px] px-3 pb-[1px] text-[13px] border border-[#b41541] bg-[#b41541] hover:shadow-[0_1px_4px_#0000004d] hover:bg-blend-lighten hover:bg-[linear-gradient(#d8f5e914,#d8f5e914)] font-bold select-none text-white rounded-lg"
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        </StreamTheme>
      );
    case callingState === CallingState.RINGING:
      return (
        <StreamTheme>
          <div className="absolute pr-4 bottom-2 left-2 w-full">
            <div className="w-full max-w-[340px] p-3 bg-[#101214] rounded-xl overflow-hidden border border-[#797c814d]">
              <div className="flex items-start text-[14.8px]">
                <div className="mr-2"></div>
                <p>
                  <b>Busayo Jacobs</b> is inviting you to a huddle in this
                  channel
                </p>
              </div>
              <div className="mt-3 flex flex-col items-center gap-1.5">
                <button
                  onClick={joinCall}
                  disabled={buttonsDisabled}
                  className="w-full h-[26px] rounded-lg border border-[#e0e0e0] bg-[#e0e0e0] hover:bg-[#696a6b] hover:border-[#696a6b] px-3 text-[13px] text-[#101214] font-bold"
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
    default:
      return null;
  }
};

export default Huddle;
