import { Workspace } from '@prisma/client';

import Button from './Button';

interface WorkspaceListProps {
  action: (formData: FormData) => void;
  actionText: string;
  buttonVariant?: 'primary' | 'secondary';
  title: string;
  workspaces: (Omit<Workspace, 'ownerId'> & {
    memberCount: number;
    token?: string;
    firstChannelId?: string;
  })[];
}

const placeholderImage =
  'https://a.slack-edge.com/80588/img/avatars-teams/ava_0014-88.png';

const WorkspaceList = ({
  action,
  actionText,
  buttonVariant = 'primary',
  title,
  workspaces,
}: WorkspaceListProps) => {
  return (
    <div className="rounded-[9px] mb-12 border-[#fff3] border-4">
      <div className="flex items-center bg-[#ecdeec] text-black p-4 text-lg rounded-t-[5px] min-h-[calc(50px+2rem)]">
        {title}
      </div>
      <div className="flex flex-col rounded-b-[5px] bg-[#fff] [&>:not(:first-child)]:border [&>:not(:first-child)]:border-t-[#ebeaeb]">
        {workspaces.map((workspace) => (
          <form action={action} key={workspace.id} className="p-4">
            <input
              type="hidden"
              name="channelId"
              value={workspace?.firstChannelId}
            />
            <input type="hidden" name="token" value={workspace?.token} />
            <input type="hidden" name="workspaceId" value={workspace.id} />
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={workspace.image || placeholderImage}
                alt="workspace-image"
                className="rounded-[5px] mr-4 h-[75px] w-[75px] object-cover"
              />
              <div className="flex flex-col my-auto text-black">
                <span className="text-lg font-bold mb-2">{workspace.name}</span>
                <div className="flex h-5">
                  <span className="text-[#696969] text-[14.5px]">
                    {workspace.memberCount} member
                    {workspace.memberCount !== 1 && 's'}
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <Button type="submit" variant={buttonVariant}>
                  <span>{actionText}</span>
                </Button>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceList;
