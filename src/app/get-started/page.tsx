'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import TextField from '@/components/TextField';
import RailButton from '@/components/RailButton';
import Home from '@/components/icons/Home';
import MoreHoriz from '@/components/icons/MoreHoriz';
import ArrowDropdown from '@/components/icons/ArrowDropdown';
import SidebarButton from '@/components/SidebarButton';
import Hash from '@/components/icons/Hash';
import Tags from '@/components/Tags';
import Button from '@/components/Button';
import { isUrl } from '@/lib/utils';
import Avatar from '../../components/Avatar';

const pattern = `(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`;

const GetStarted = () => {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState('');
  const [channelName, setChannelName] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const allFieldsValid = Boolean(
    workspaceName &&
      channelName &&
      (!imageUrl || (isUrl(imageUrl) && RegExp(pattern).test(imageUrl))) &&
      emails.length > 0
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (allFieldsValid) {
      e.stopPropagation();

      try {
        setLoading(true);
        const response = await fetch('/api/workspaces/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            workspaceName,
            channelName,
            emails,
            imageUrl,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Workspace created successfully!');
          const { workspace, channel } = result;
          router.push(`/client/${workspace.id}/${channel.id}`);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Error creating workspace:', error);
        alert('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="client font-lato w-screen h-screen flex flex-col">
      <div className="absolute w-full h-full bg-theme-gradient" />
      <div className="relative w-full h-10 flex items-center justify-between pr-1"></div>
      <div className="w-screen h-[calc(100vh-40px)] grid grid-cols-[70px_auto]">
        <div className="relative w-[4.375rem] flex flex-col items-center overflow-hidden gap-3 pt-2 z-[1000] bg-transparent">
          <div className="w-9 h-9 mb-[5px]">
            <Avatar
              width={36}
              borderRadius={8}
              fontSize={20}
              fontWeight={600}
              data={{ name: workspaceName, image: imageUrl }}
            />
          </div>
          <div className="relative flex flex-col items-center w-[3.25rem]">
            <div className="relative">
              <RailButton
                title="Home"
                icon={<Home color="var(--primary)" filled />}
                active
              />
              <div className="absolute w-full h-full top-0 left-0" />
            </div>
            <div className="relative opacity-30">
              <RailButton
                title="More"
                icon={<MoreHoriz color="var(--primary)" />}
              />
              <div className="absolute w-full h-full top-0 left-0" />
            </div>
          </div>
        </div>
        <div className="relative flex mr-1 mb-1 rounded-md overflow-hidden border border-solid border-[#797c814d]">
          <div className="w-[275px] relative px-2 flex flex-col flex-shrink-0 gap-3 min-w-0 min-h-0 max-h-[calc(100vh-44px)] bg-[#10121499] border-r-[1px] border-solid border-r-[#797c814d]">
            <div className="pl-1 w-full h-[49px] flex items-center justify-between">
              <div className="max-w-[calc(100%-80px)]">
                <div className="w-fit max-w-full rounded-md py-[3px] px-2 flex items-center text-white hover:bg-hover-gray">
                  <span className="truncate text-[18px] font-[900] leading-[1.33334]">
                    {workspaceName}
                  </span>
                </div>
              </div>
            </div>
            {channelName && (
              <div className="w-full flex flex-col">
                <div className="h-7 -ml-1.5 flex items-center px-4 text-[15px] leading-7">
                  <button className="hover:bg-hover-gray rounded-md">
                    <ArrowDropdown color="var(--icon-gray)" />
                  </button>
                  <button className="flex px-[5px] max-w-full rounded-md text-sidebar-gray font-medium hover:bg-hover-gray">
                    Channels
                  </button>
                </div>
                <SidebarButton icon={Hash} title={channelName} />
              </div>
            )}
            <div className="absolute w-full h-full top-0 left-0" />
          </div>
          <div className="bg-[#1a1d21] grow p-16 flex flex-col">
            <div className="max-w-[705px] flex flex-col gap-8">
              <h2 className="max-w-[632px] font-sans font-bold mb-2 text-[45px] leading-[46px] text-white">
                Create a new workspace
              </h2>
              <form onSubmit={onSubmit} action={() => {}} className="contents">
                <TextField
                  label="Workspace name"
                  name="workspaceName"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Enter a name for your workspace"
                  required
                />
                <TextField
                  label={
                    <span>
                      Workspace image{' '}
                      <span className="text-[#9a9b9e] ml-0.5">(optional)</span>
                    </span>
                  }
                  name="workspaceImage"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste an image URL"
                  pattern={`(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))`}
                  title='Image URL must start with "http://" or "https://" and end with ".png", ".jpg", ".jpeg", ".gif", or ".svg"'
                />
                <TextField
                  label="Channel name"
                  name="channelName"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="Enter a name for your first channel"
                  maxLength={80}
                  required
                />
                <Button
                  type="submit"
                  disabled={emails.length === 0}
                  className="w-fit order-5 capitalize py-2 hover:bg-[#592a5a] hover:border-[#592a5a]"
                  loading={loading}
                >
                  Submit
                </Button>
              </form>
              <Tags
                values={emails}
                setValues={setEmails}
                label="Invite members"
                placeholder="Enter email addresses"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
