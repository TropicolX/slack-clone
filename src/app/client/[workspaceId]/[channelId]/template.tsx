'use client';
import { useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { StreamCall, useCalls } from '@stream-io/video-react-sdk';

import { AppContext } from '../../layout';
import Huddle from '@/components/Huddle';
import HuddleModal from '@/components/HuddleModal';

export default function Template({ children }: { children: React.ReactNode }) {
  const [currentCall] = useCalls();
  const { channelCall } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const body = document.querySelector('body');

  return (
    <>
      {children}
      {sidebar &&
        huddleCall &&
        createPortal(
          <StreamCall call={huddleCall}>
            <Huddle isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </StreamCall>,
          sidebar
        )}
      {body &&
        huddleCall &&
        createPortal(
          <StreamCall call={huddleCall}>
            <HuddleModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </StreamCall>,
          body
        )}
    </>
  );
}
