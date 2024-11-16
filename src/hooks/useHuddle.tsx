import {
  CallingState,
  hasScreenShare,
  isPinned,
  OwnCapability,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const useHuddle = () => {
  const call = useCall();
  const {
    useCallCallingState,
    useCallCustomData,
    useCameraState,
    useMicrophoneState,
    useScreenShareState,
    useParticipants,
  } = useCallStateHooks();
  const callingState = useCallCallingState();
  const customData = useCallCustomData();
  const {
    microphone,
    optimisticIsMute: isMicrophoneMute,
    hasBrowserPermission: hasMicrophonePermission,
  } = useMicrophoneState();
  const {
    camera,
    optimisticIsMute: isCameraMute,
    hasBrowserPermission: hasCameraPermission,
  } = useCameraState();
  const { screenShare } = useScreenShareState();
  const participants = useParticipants();
  const [participantInSpotlight] = participants;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [huddleRef.current]);

  const leaveCall = useCallback(async () => {
    const canEndCall = call?.permissionsContext.hasPermission(
      OwnCapability.END_CALL
    );

    if (canEndCall) {
      await call?.endCall();
    } else {
      await call?.leave();
    }
  }, [call]);

  const isSpeakerLayout = useMemo(() => {
    if (participantInSpotlight) {
      return (
        hasScreenShare(participantInSpotlight) ||
        isPinned(participantInSpotlight)
      );
    }
    return false;
  }, [participantInSpotlight]);

  const toggleMicrophone = async () => {
    try {
      await microphone.toggle();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCamera = async () => {
    try {
      await camera.toggle();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleScreenShare = async () => {
    try {
      await screenShare.toggle();
    } catch (error) {
      console.error(error);
    }
  };

  const buttonsDisabled = callingState === CallingState.JOINING;

  return {
    call,
    callingState,
    screenShare,
    customData,
    isMicrophoneMute,
    hasMicrophonePermission,
    isCameraMute,
    hasCameraPermission,
    leaveCall,
    toggleMicrophone,
    toggleCamera,
    toggleScreenShare,
    width,
    huddleRef,
    buttonsDisabled,
    isSpeakerLayout,
  };
};

export default useHuddle;
