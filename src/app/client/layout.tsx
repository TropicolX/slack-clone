'use client';
import { ReactNode } from 'react';

import ArrowBack from '@/components/icons/ArrowBack';
import ArrowForward from '@/components/icons/ArrowForward';
import Clock from '@/components/icons/Clock';
import IconButton from '@/components/IconButton';
import Help from '@/components/icons/Help';
import WorkspaceSwitcher from '@/components/WorkspaceSwitcher';
import RailButton from '@/components/RailButton';
import Home from '@/components/icons/Home';
import Messages from '@/components/icons/Messages';
import Notifications from '@/components/icons/Notifications';
import Bookmark from '@/components/icons/Bookmark';
import MoreHoriz from '@/components/icons/MoreHoriz';
import SearchBar from '@/components/SearchBar';
import WorkspaceLayout from '@/components/WorkspaceLayout';

interface LayoutProps {
  children?: ReactNode;
  params: {
    workspaceId: string;
    channelId: string;
  };
}

const Layout = ({ children, params }: LayoutProps) => {
  const homeActive = true;

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="absolute w-full h-full bg-theme-gradient" />
      {/* Toolbar */}
      <div className="relative w-full h-10 flex items-center justify-between pr-1">
        <div className="w-[4.375rem] h-10 mr-auto flex-none" />
        <div className="flex flex-auto items-center">
          <div className="relative flex flex-none basis-[24%]">
            <div className="flex justify-start basis-full" />
            <div className="flex justify-end basis-full mr-3">
              <div className="flex gap-1 items-center">
                <IconButton icon={<ArrowBack color="var(--primary)" />} />
                <IconButton
                  icon={<ArrowForward color="var(--primary)" />}
                  disabled
                />
              </div>
              <div className="flex items-center ml-1">
                <IconButton icon={<Clock color="var(--primary)" />} />
              </div>
            </div>
          </div>
          <SearchBar />
          <div className="flex flex-[1_0_auto] items-center justify-end mr-1">
            <IconButton icon={<Help color="var(--primary)" />} />
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="w-screen h-[calc(100vh-40px)] grid grid-cols-[70px_auto]">
        {/* Rail */}
        <div className="relative w-[4.375rem] flex flex-col items-center overflow-hidden gap-3 pt-2 z-[1000] bg-transparent">
          <WorkspaceSwitcher />
          <div className="relative flex flex-col items-center w-[3.25rem]">
            <RailButton
              title="Home"
              active={homeActive}
              icon={<Home color="var(--primary)" filled={homeActive} />}
            />
            <RailButton
              title="DMs"
              icon={<Messages color="var(--primary)" />}
            />
            <RailButton
              title="Activity"
              icon={<Notifications color="var(--primary)" />}
            />
            <RailButton
              title="Later"
              icon={<Bookmark color="var(--primary)" />}
            />
            <RailButton
              title="More"
              icon={<MoreHoriz color="var(--primary)" />}
            />
          </div>
        </div>
        <WorkspaceLayout>{children}</WorkspaceLayout>
      </div>
    </div>
  );
};

export default Layout;
