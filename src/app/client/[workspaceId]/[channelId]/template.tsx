'use client';
import { useContext, useMemo } from 'react';
import { StreamCall, useCalls } from '@stream-io/video-react-sdk';
import { createPortal } from 'react-dom';

import { AppContext } from '../../layout';
import Huddle from '@/components/Huddle';

export default function Template({ children }: { children: React.ReactNode }) {
  const [currentCall] = useCalls();

  const { channelCall } = useContext(AppContext);

  const huddleCall = useMemo(() => {
    switch (true) {
      case !!currentCall && !!channelCall:
        return currentCall.id === channelCall.id ? channelCall : currentCall;
      case !!currentCall:
        return currentCall;
      case !!channelCall:
        return channelCall;
      default:
        return undefined;
    }
  }, [currentCall, channelCall]);

  const sidebar = document.getElementById('sidebar');

  return (
    <>
      {children}
      {sidebar &&
        huddleCall &&
        createPortal(
          <StreamCall call={huddleCall}>
            <Huddle />
          </StreamCall>,
          sidebar
        )}
    </>
  );
}
