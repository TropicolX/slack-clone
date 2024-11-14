import { FormEvent, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AppContext } from '../app/client/layout';
import Modal from './Modal';
import Spinner from './Spinner';
import TextField from './TextField';

interface AddChannelModalProps {
  open: boolean;
  onClose: () => void;
}

const AddChannelModal = ({ open, onClose }: AddChannelModalProps) => {
  const router = useRouter();
  const { setChannel, workspace, setWorkspace } = useContext(AppContext);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const channelNameRegex = useMemo(() => {
    const channelNames = workspace.channels.map((channel) => channel.name);
    return `^(?!${channelNames.join('|')}).+$`;
  }, [workspace.channels]);

  const createChannel = async (e: FormEvent) => {
    const regex = new RegExp(channelNameRegex);
    if (channelName && regex.test(channelName)) {
      e.stopPropagation();
      try {
        setLoading(true);
        const response = await fetch(
          `/api/workspaces/${workspace.id}/channels/create`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: channelName.trim(),
              description: channelDescription.trim(),
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          const { channel } = result;
          setWorkspace({
            ...workspace,
            channels: [...workspace.channels, { ...channel }],
          });
          setChannel(channel);
          setLoading(false);
          closeModal();
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

  const closeModal = () => {
    setChannelName('');
    setChannelDescription('');
    onClose();
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={closeModal}
      loading={loading}
      title="Create a channel"
    >
      <form
        onSubmit={createChannel}
        action={() => {}}
        className="flex flex-col gap-6"
      >
        <TextField
          name="channelName"
          label="Channel name"
          placeholder="e.g. plan-budget"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          pattern={channelNameRegex}
          title="That name is already taken by another channel in this workspace"
          maxLength={80}
          required
        />
        <TextField
          name="channelDescription"
          label={
            <span>
              Channel description{' '}
              <span className="text-[#9a9b9e] ml-0.5">(optional)</span>
            </span>
          }
          placeholder="Add a description"
          value={channelDescription}
          onChange={(e) => setChannelDescription(e.target.value)}
          multiline={5}
          maxLength={250}
        />
        <div className="w-full flex items-center justify-end gap-3">
          <button
            type="submit"
            onClick={createChannel}
            className="order-2 flex items-center justify-center min-w-[80px] h-[36px] px-3 pb-[1px] text-[15px] border border-[#00553d] bg-[#00553d] hover:shadow-[0_1px_4px_#0000004d] hover:bg-blend-lighten hover:bg-[linear-gradient(#d8f5e914,#d8f5e914)] font-bold select-none text-white rounded-lg"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Save'}
          </button>
          <button
            onClick={closeModal}
            className="min-w-[80px] h-[36px] px-3 pb-[1px] text-[15px] border border-[#797c8180] font-bold select-none text-white rounded-lg"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddChannelModal;
