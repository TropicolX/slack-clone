import { useContext } from 'react';
import { ChannelPreviewUIComponentProps } from 'stream-chat-react';
import { usePathname, useRouter } from 'next/navigation';

import { AppContext } from '../app/client/layout';
import Hash from './icons/Hash';
import SidebarButton from './SidebarButton';

const ChannelPreview = ({
  channel,
  displayTitle,
  unread,
}: ChannelPreviewUIComponentProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { workspace, setChannel } = useContext(AppContext);

  const goToChannel = () => {
    const channelId = channel.id;
    setChannel(workspace.channels.find((c) => c.id === channelId)!);
    router.push(`/client/${workspace.id}/${channelId}`);
  };

  const channelActive = () => {
    const pathChannelId = pathname.split('/').filter(Boolean).pop();
    return pathChannelId === channel.id;
  };

  return (
    <SidebarButton
      icon={Hash}
      title={displayTitle}
      onClick={goToChannel}
      active={channelActive()}
      boldText={Boolean(unread)}
    />
  );
};

export default ChannelPreview;
