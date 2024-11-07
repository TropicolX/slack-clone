import React from 'react';
import { MessageText, renderText, useMessageContext } from 'stream-chat-react';

import AddReaction from './icons/AddReaction';
import Threads from './icons/Threads';
import Share from './icons/Share';
import Bookmark from './icons/Bookmark';
import MoreVert from './icons/MoreVert';

const ChannelMessage = () => {
  // Edit message
  // Delete message
  // Add reaction
  // Reply to thread
  // If previous message is from the same user, hide the avatar? There's also the time difference between messages

  const { message } = useMessageContext();

  const createdAt = new Date(message.created_at!).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="relative flex py-2 pl-5 pr-10 group/message hover:bg-[#22252a]">
      {/* Image */}
      <div className="flex shrink-0 mr-2">
        <span className="w-fit h-fit inline-flex">
          <button className="w-9 h-9 shrink-0 inline-block">
            <span className="w-full h-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={message.user?.image}
                alt="profile-image"
                className="w-full h-full rounded-lg"
              />
            </span>
          </button>
        </span>
      </div>
      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="cursor-pointer text-[15px] leading-[1.46668] font-[900] text-white hover:underline">
            {message.user?.name}
          </span>
          <span className="pt-1 cursor-pointer text-xs leading-[1.46668] text-[#ABABAD] hover:underline">
            {createdAt}
          </span>
        </div>
        <div className="mb-1">
          <div className="w-full">
            <div className="flex">
              <MessageText
                renderText={(text, mentionedUsers) =>
                  renderText(text, mentionedUsers, {
                    customMarkDownRenderers: {
                      br: () => <span className="paragraph_break block h-2" />,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* Message Actions */}
      <div className="z-20 hidden group-hover/message:inline-flex absolute -top-4 right-[38px]">
        <div className="flex p-0.5 rounded-md ml-2 bg-[#1a1d21] border border-[#797c814d]">
          <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#d1d2d30b]">
            <AddReaction className="fill-[#e8e8e8b3] group-hover/button:fill-channel-gray" />
          </button>
          <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#d1d2d30b]">
            <Threads className="fill-[#e8e8e8b3] group-hover/button:fill-channel-gray" />
          </button>
          <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#d1d2d30b]">
            <Share className="fill-[#e8e8e8b3] group-hover/button:fill-channel-gray" />
          </button>
          <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#d1d2d30b]">
            <Bookmark
              size={18}
              className="fill-[#e8e8e8b3] group-hover/button:fill-channel-gray"
            />
          </button>
          <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#d1d2d30b]">
            <MoreVert
              size={18}
              className="fill-[#e8e8e8b3] group-hover/button:fill-channel-gray"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelMessage;
