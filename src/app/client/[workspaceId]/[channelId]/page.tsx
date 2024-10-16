import React from 'react';

interface ChannelProps {
  params: {
    workspaceId: string;
    channelId: string;
  };
}

const Channel = ({}: ChannelProps) => {
  return <div>Channel</div>;
};

export default Channel;
