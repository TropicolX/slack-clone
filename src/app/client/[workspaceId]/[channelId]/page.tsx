'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { Channel as PrismaChannel } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
import { Channel as ChannelType } from 'stream-chat';
import { DefaultStreamChatGenerics } from 'stream-chat-react';
import clsx from 'clsx';

import { AppContext } from '../../layout';
import ChannelChat from '@/components/ChannelChat';
import Files from '@/components/icons/Files';
import Hash from '@/components/icons/Hash';
import Message from '@/components/icons/Message';
import MoreVert from '@/components/icons/MoreVert';
import Pin from '@/components/icons/Pin';
import Plus from '@/components/icons/Plus';

interface ChannelProps {
  params: {
    workspaceId: string;
    channelId: string;
  };
}

const Channel = ({ params }: ChannelProps) => {
  const { workspaceId, channelId } = params;
  const { user } = useUser();
  const {
    chatClient,
    loading,
    setLoading,
    workspace,
    setWorkspace,
    setOtherWorkspaces,
  } = useContext(AppContext);
  const [channel, setChannel] = useState<PrismaChannel>();
  const [chatChannel, setChatChannel] =
    useState<ChannelType<DefaultStreamChatGenerics>>();
  const [channelLoading, setChannelLoading] = useState(true);

  const [pageWidth, setPageWidth] = useState(0);
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || !layoutRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setPageWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(layoutRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [layoutRef, loading]);

  useEffect(() => {
    const loadWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspaces/${workspaceId}`);
        const result = await response.json();
        if (response.ok) {
          setWorkspace(result.workspace);
          setOtherWorkspaces(result.otherWorkspaces);
          localStorage.setItem(
            'activitySession',
            JSON.stringify({ workspaceId, channelId })
          );
        } else {
          console.error('Error fetching workspace data:', result.error);
        }
      } catch (error) {
        console.error('Error fetching workspace data:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadChannel = () => {
      const channel = chatClient.channel('messaging', channelId);
      setChatChannel(channel);
      setChannelLoading(false);
    };

    const loadWorkspaceAndChannel = async () => {
      if (!workspace) {
        await loadWorkspace();
      } else {
        if (!channel)
          setChannel(workspace.channels.find((c) => c.id === channelId));
        if (loading) setLoading(false);
        if (chatClient) loadChannel();
      }
    };

    if (!chatChannel && user) loadWorkspaceAndChannel();
  }, [
    channel,
    loading,
    chatChannel,
    chatClient,
    workspace,
    workspaceId,
    channelId,
    setLoading,
    setWorkspace,
    setOtherWorkspaces,
    user,
  ]);

  if (loading) return null;

  return (
    <div
      ref={layoutRef}
      className="channel bg-[#1a1d21] font-lato w-full h-full z-100 flex flex-col overflow-hidden text-channel-gray"
    >
      {/* Toolbar */}
      <div className="pl-4 pr-3 h-[49px] flex items-center flex-shrink-0 justify-between">
        <div className="flex flex-[1_1_0] items-center min-w-0">
          <button className="min-w-[96px] px-2 py-[3px] -ml-1 mr-2 flex flex-[0_auto] items-center text-[17.8px] rounded-md text-channel-gray hover:bg-[#d1d2d30b] leading-[1.33334]">
            <span className="mr-1 align-text-bottom">
              <Hash color="var(--channel-gray)" size={18} />
            </span>
            <span className="truncate font-[900]">{channel?.name}</span>
          </button>
          <div
            className={clsx(
              'w-[96px] flex-[1_1_0] min-w-[96px] mr-2 pt-1 text-[12.8px] text-[#e8e8e8b3]',
              pageWidth > 0 && pageWidth < 500 ? 'hidden' : 'flex'
            )}
          >
            <span className="min-w-[96px] max-w-[min(70%,540px)] truncate">
              {channel?.description}
            </span>
          </div>
        </div>
        <div className="flex flex-none ml-auto items-center">
          <button
            className={clsx(
              'w-[106.2px] items-center pl-[3px] py-[3px] rounded-lg h-7 border border-[#797c814d] text-[#e8e8e8b3]',
              pageWidth > 0 && pageWidth < 605 ? 'hidden' : 'flex'
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
      {/* Tab Bar */}
      <div className="w-full min-w-full max-w-full h-[38px] flex items-center pl-4 pr-3 shadow-[inset_0_-1px_0_0_#797c814d] gap-1">
        <div className="flex items-center cursor-pointer w-[92.45px] h-full p-2 gap-1 text-[13px] leading-[1.38463] text-center font-bold rounded-t-lg hover:bg-hover-gray border-b-[2px] border-white">
          <Message color="var(--primary)" />
          Messages
        </div>
        <div className="group flex items-center cursor-pointer text-[#b9babd] h-full p-2 gap-1 text-[13px] leading-[1.38463] text-center font-bold rounded-t-lg hover:bg-hover-gray hover:text-white">
          <Files className="fill-icon-gray group-hover:fill-white" size={16} />
          Files
        </div>
        <div className="group flex items-center cursor-pointer text-[#b9babd] h-full p-2 gap-1 text-[13px] leading-[1.38463] text-center font-bold rounded-t-lg hover:bg-hover-gray hover:text-white">
          <Pin className="fill-icon-gray group-hover:fill-white" size={16} />
          Pins
        </div>
        <div className="group flex items-center justify-center cursor-pointer h-7 w-7 rounded-full hover:bg-hover-gray">
          <Plus
            filled
            className="fill-icon-gray group-hover:fill-white"
            size={16}
          />
        </div>
      </div>
      {/* Chat */}
      <div className="relative flex flex-col w-full h-full flex-1 overflow-hidden ">
        {/* Body */}
        <div className="relative flex-1">
          <div className="absolute -top-2 bottom-0 flex w-full overflow-hidden">
            <div
              style={{
                width: pageWidth > 0 ? pageWidth : '100%',
              }}
              className="relative"
            >
              <div className="absolute h-full inset-[0_-50px_0_0] overflow-y-scroll overflow-x-hidden z-50">
                {/* Messages */}
                {channelLoading && (
                  <div className="div">I&apos;m loading...</div>
                )}
                {!channelLoading && <ChannelChat channel={chatChannel!} />}
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="relative max-h-[calc(100%-36px)] flex flex-col -mt-2 px-5">
          <div id="message-input" className="flex-1">
            {/* Input container */}
            {/* <InputContainer /> */}
          </div>
          <div className="w-full flex items-center h-6 pl-3 pr-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Channel;
