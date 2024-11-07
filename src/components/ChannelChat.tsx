import React from 'react';
import { Channel as ChannelType } from 'stream-chat';
import {
  Channel,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  Window,
} from 'stream-chat-react';
import InputContainer from './InputContainer';
import { createPortal } from 'react-dom';
import ChannelMessage from './ChannelMessage';
import DateSeperator from './DateSeparator';

interface ChannelChatProps {
  channel: ChannelType<DefaultStreamChatGenerics>;
}

const ChannelChat = ({ channel }: ChannelChatProps) => {
  const inputContainer = document.getElementById('message-input');

  return (
    <div className="w-full h-full">
      <Channel channel={channel} DateSeparator={DateSeperator}>
        <Window>
          <MessageList Message={ChannelMessage} />
          {inputContainer &&
            createPortal(
              <MessageInput Input={InputContainer} />,
              inputContainer
            )}
        </Window>
      </Channel>
    </div>
  );
};

export default ChannelChat;
