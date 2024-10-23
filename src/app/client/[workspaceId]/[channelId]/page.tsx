'use client';
import React, { useEffect, useState } from 'react';
import Hash from '../../../../components/icons/Hash';
import MoreVert from '../../../../components/icons/MoreVert';
import clsx from 'clsx';

interface ChannelProps {
  params: {
    workspaceId: string;
    channelId: string;
  };
}

const Channel = ({}: ChannelProps) => {
  const channelRef = React.useRef<HTMLDivElement>(null);
  const [channelWidth, setChannelWidth] = useState(0);

  useEffect(() => {
    if (!channelRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setChannelWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(channelRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [channelRef]);

  return (
    <div
      ref={channelRef}
      className="w-full h-full z-100 flex flex-col overflow-hidden"
    >
      <div className="pl-4 pr-3 h-[49px] flex items-center flex-shrink-0 justify-between">
        <div className="flex flex-[1_1_0] items-center min-w-0">
          <button className="min-w-[96px] px-2 py-[3px] -ml-1 mr-2 flex flex-[0_auto] items-center text-[17.8px] rounded-md text-channel-gray hover:bg-[#d1d2d30b] leading-[1.33334]">
            <span className="mr-1 align-text-bottom">
              <Hash color="var(--channel-gray)" size={18} />
            </span>
            <span className="truncate font-[900]">career-advice</span>
          </button>
          <div
            className={clsx(
              'w-[96px] flex-[1_1_0] min-w-[96px] mr-2 pt-1 text-[12.8px] text-[#e8e8e8b3]',
              channelWidth > 0 && channelWidth < 500 ? 'hidden' : 'flex'
            )}
          >
            <span className="min-w-[96px] max-w-[min(70%,540px)] truncate">
              resources for learning; interviewing; remote work; etc. Also
              salary and compensations
            </span>
          </div>
        </div>
        <div className="flex flex-none ml-auto items-center">
          <button
            className={clsx(
              'w-[106.2px] items-center pl-[3px] py-[3px] rounded-lg h-7 border border-[#797c814d] text-[#e8e8e8b3]',
              channelWidth > 0 && channelWidth < 605 ? 'hidden' : 'flex'
            )}
          ></button>
          <div className="w-[59px] flex items-center ml-2 rounded-lg h-7 border border-[#797c814d] text-[#e8e8e8b3]">
            <button className=""></button>
            <button className=""></button>
          </div>
          <button className="group rounded-lg flex w-7 h-7 ml-2 items-center justify-center hover:bg-[#d1d2d30b]">
            <MoreVert className="fill-[#e8e8e8b3] group-hover:fill-channel-gray" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Channel;
