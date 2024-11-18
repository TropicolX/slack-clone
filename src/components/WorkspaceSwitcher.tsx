import { MutableRefObject, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { AppContext, Workspace } from '@/app/client/layout';
import Avatar from './Avatar';
import Plus from './icons/Plus';
import useClickOutside from '@/hooks/useClickOutside';

const WorkspaceSwitcher = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    workspace,
    setWorkspace,
    otherWorkspaces,
    setOtherWorkspaces,
    setChannel,
  } = useContext(AppContext);

  const domNode = useClickOutside(() => {
    setOpen(false);
  }, true) as MutableRefObject<HTMLDivElement>;

  const switchWorkspace = (otherWorkspace: Workspace) => {
    setOtherWorkspaces([
      ...otherWorkspaces.filter((w) => w.id !== otherWorkspace.id),
      workspace,
    ]);
    setWorkspace(otherWorkspace);
    setChannel(otherWorkspace.channels[0]);
    router.push(
      `/client/${otherWorkspace.id}/${otherWorkspace.channels[0].id}`
    );
  };

  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className="relative w-9 h-9 mb-[5px] cursor-pointer"
    >
      <Avatar
        width={36}
        borderRadius={8}
        fontSize={20}
        fontWeight={700}
        data={{ name: workspace.name, image: workspace.image }}
      />
      <div
        ref={domNode}
        className={clsx(
          'z-[99] absolute top-11 -left-3 flex-col items-start text-channel-gray text-left w-[360px] rounded-xl overflow-hidden bg-[#212428] border border-[#797c8126] py-1',
          open ? 'flex' : 'hidden'
        )}
      >
        <div className="w-full px-4 py-2 text-[15px] leading-7 hover:bg-[#36383b]">
          <div className="leading-[22px] font-bold truncate">
            {workspace.name}
          </div>
          <div className="text-[13px] leading-[18px]">
            {workspace.name.replace(/\s/g, '').toLowerCase()}.slack.com
          </div>
        </div>
        <div className="w-full h-[1px] my-2 bg-[#797c8126]" />
        <div className="flex flex-col text-[12.8px] leading-[1.38463] m-[4px_12px_4px_16px]">
          <span className="font-bold">Never miss a notification</span>
          <div>
            <span className="cursor-pointer text-[#1D9BD1] hover:underline">
              Get the Slack app
            </span>{' '}
            to see notifications from your other workspaces
          </div>
        </div>
        <div className="w-full h-[1px] my-2 bg-[#797c8126]" />
        {otherWorkspaces.map((otherWorkspace) => (
          <button
            key={otherWorkspace.id}
            className="px-4 flex items-center w-full h-[52px] hover:bg-[#37393d] gap-3 text-[14.8px]"
            onClick={() => switchWorkspace(otherWorkspace)}
          >
            <Avatar
              width={36}
              borderRadius={8}
              fontSize={20}
              fontWeight={700}
              data={{ name: otherWorkspace.name, image: otherWorkspace.image }}
            />
            <div className="flex flex-col text-left">
              <div className="leading-[22px] font-bold truncate">
                {otherWorkspace.name}
              </div>
              <div className="text-[13px] leading-[18px]">
                {otherWorkspace.name.replace(/\s/g, '').toLowerCase()}.slack.com
              </div>
            </div>
          </button>
        ))}
        <button
          className="px-4 flex items-center w-full h-[52px] hover:bg-[#37393d] gap-3 text-[14.8px]"
          onClick={() => router.push(`/get-started`)}
        >
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#f8f8f80f]">
            <Plus color="var(--primary)" filled />
          </div>
          <div className="flex flex-col text-left text-white">
            Add a workspace
          </div>
        </button>
      </div>
    </div>
  );
};

export default WorkspaceSwitcher;
