'use client';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AppContext, Workspace } from '../layout';

interface WorkspacePageProps {
  params: {
    workspaceId: string;
  };
}

export default function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceId } = params;
  const { workspace, setWorkspace, setOtherWorkspaces } =
    useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const goToChannel = (workspace: Workspace) => {
      const channelId = workspace.channels[0].id;
      localStorage.setItem(
        'activitySession',
        JSON.stringify({ workspaceId: workspace.id, channelId })
      );
      router.push(`/client/${workspace.id}/${channelId}`);
    };

    const loadWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspaces/${workspaceId}`);
        const result = await response.json();
        if (response.ok) {
          setWorkspace(result.workspace);
          setOtherWorkspaces(result.otherWorkspaces);
          goToChannel(result.workspace);
        } else {
          console.error('Error fetching workspace data:', result.error);
        }
      } catch (error) {
        console.error('Error fetching workspace data:', error);
      }
    };

    if (!workspace) {
      loadWorkspace();
    } else {
      goToChannel(workspace);
    }
  }, [workspace, workspaceId, setWorkspace, setOtherWorkspaces, router]);

  return null;
}
