import { useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  MessageText,
  renderText,
  useChannelStateContext,
  useMessageContext,
} from 'stream-chat-react';
import clsx from 'clsx';
import emojiData from '@emoji-mart/data';

import AddReaction from './icons/AddReaction';
import Avatar from './Avatar';
import Bookmark from './icons/Bookmark';
import Download from './icons/Download';
import EmojiPicker from './EmojiPicker';
import MoreVert from './icons/MoreVert';
import Share from './icons/Share';
import Threads from './icons/Threads';

const ChannelMessage = () => {
  const { message } = useMessageContext();
  const { channel } = useChannelStateContext('ChannelMessage');
  const { user } = useUser();

  const reactionCounts = useMemo(() => {
    if (!message.reaction_groups) {
      return [];
    }
    return Object.entries(
      Object.entries(message.reaction_groups!)
        ?.sort(
          (a, b) =>
            new Date(a[1].first_reaction_at!).getTime() -
            new Date(b[1].first_reaction_at!).getTime()
        )
        .reduce((acc, entry) => {
          const [type, event] = entry;
          acc[type] = acc[type] || { count: 0, reacted: false };
          acc[type].count = event.count;
          if (
            message.own_reactions?.some(
              (reaction) =>
                reaction.type === type && reaction.user_id === user!.id
            )
          ) {
            acc[type].reacted = true;
          }
          return acc;
        }, {} as Record<string, { count: number; reacted: boolean }>)
    );
  }, [message.reaction_groups, message.own_reactions, user]);

  const createdAt = new Date(message.created_at!).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const downloadFile = async (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop()!;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReaction = async (e: { id: string; native?: string }) => {
    await channel.sendReaction(message.id, { type: e.id });
  };

  const removeReaction = async (reactionType: string) => {
    await channel.deleteReaction(message.id, reactionType);
  };

  const handleReactionClick = async (
    reactionType: string,
    isActive: boolean
  ) => {
    if (isActive) {
      removeReaction(reactionType);
    } else {
      handleReaction({ id: reactionType });
    }
  };

  const getReactionEmoji = (reactionType: string) => {
    const data = emojiData as {
      emojis: {
        [key: string]: { skins: { native: string }[] };
      };
    };
    const emoji = data.emojis[reactionType];
    if (emoji) return emoji.skins[0].native;
    return null;
  };

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
            <div className="flex flex-col">
              <MessageText
                renderText={(text, mentionedUsers) =>
                  renderText(text, mentionedUsers, {
                    customMarkDownRenderers: {
                      br: () => <span className="paragraph_break block h-2" />,
                    },
                  })
                }
              />
              <div
                className={clsx(
                  message.attachments && message.attachments.length > 0
                    ? 'flex'
                    : 'hidden',
                  'mt-3 flex-col gap-2'
                )}
              >
                {message.attachments?.map((attachment) => (
                  <div
                    key={
                      attachment?.id ||
                      attachment.image_url ||
                      attachment.asset_url
                    }
                    className={clsx(
                      'group/attachment relative cursor-pointer flex items-center rounded-xl gap-3 border border-[#d6d6d621] bg-[#1a1d21]',
                      attachment?.image_url && !attachment.asset_url
                        ? 'max-w-[360px] p-0'
                        : 'max-w-[426px] p-3'
                    )}
                  >
                    {attachment.asset_url && (
                      <>
                        <Avatar
                          width={32}
                          borderRadius={8}
                          data={{
                            name: attachment!.title!,
                            image: attachment!.image_url!,
                          }}
                        />
                        <div className="flex flex-col gap-0.5">
                          <p className="text-sm text-[#d1d2d3] break-all whitespace-break-spaces line-clamp-1 mr-2">
                            {attachment.title || `attachment`}
                          </p>
                          <p className="text-[13px] text-[#ababad] break-all whitespace-break-spaces line-clamp-1">
                            {attachment.type}
                          </p>
                        </div>
                      </>
                    )}
                    {attachment.image_url && !attachment.asset_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={attachment.image_url}
                        alt="attachment"
                        className="w-full max-h-[358px] aspect-auto rounded-lg"
                      />
                    )}
                    {/* Message Actions */}
                    <div className="z-20 hidden group-hover/attachment:inline-flex absolute top-2 right-2">
                      <div className="flex p-0.5 rounded-md ml-2 bg-[#1a1d21] border border-[#797c814d]">
                        <button
                          onClick={() =>
                            downloadFile(
                              attachment.asset_url! || attachment.image_url!
                            )
                          }
                          className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#d1d2d30b]"
                        >
                          <Download className="fill-[#e8e8e8b3] group-hover/button:fill-channel-gray" />
                        </button>
                        <button className="group/button rounded flex w-8 h-8 items-center justify-center hover:bg-[#d1d2d30b]">
                          <Share className="fill-[#e8e8e8b3] group-hover/button:fill-channel-gray" />
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
                ))}
              </div>
              {reactionCounts.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap mt-2">
                  {reactionCounts.map(([reactionType, data], index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleReactionClick(reactionType, data.reacted)
                      }
                      className={`px-2 mb-1 h-6 flex items-center gap-1 border text-white text-[11.8px] rounded-full transition-colors ${
                        data.reacted
                          ? 'bg-[#004d76] border-[#004d76]'
                          : 'bg-[#f8f8f80f] border-[#f8f8f80f]'
                      }`}
                    >
                      <span className="emoji text-[14.5px]">
                        {getReactionEmoji(reactionType)}
                      </span>{' '}
                      {data.count}
                    </button>
                  ))}
                  <EmojiPicker
                    ButtonIconComponent={AddReaction}
                    wrapperClassName="group/button relative mb-1 rounded-full bg-[#f8f8f80f] flex w-8 h-6 items-center justify-center hover:bg-[#d1d2d30b]"
                    buttonClassName="fill-[#e8e8e8b3] group-hover/button:fill-channel-gray"
                    onEmojiSelect={handleReaction}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Message Actions */}
      <div className="z-20 hidden group-hover/message:inline-flex absolute -top-4 right-[38px]">
        <div className="flex p-0.5 rounded-md ml-2 bg-[#1a1d21] border border-[#797c814d]">
          <EmojiPicker
            ButtonIconComponent={AddReaction}
            wrapperClassName="group/button relative rounded flex w-8 h-8 items-center justify-center hover:bg-[#d1d2d30b]"
            buttonClassName="fill-[#e8e8e8b3] group-hover/button:fill-channel-gray"
            onEmojiSelect={handleReaction}
          />
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
