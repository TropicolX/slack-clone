'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Client() {
  const router = useRouter();

  useEffect(() => {
    const fetchActivitySession = async () => {
      const activitySession = localStorage.getItem('activitySession');
      if (activitySession) {
        const { workspaceId, channelId } = await JSON.parse(activitySession);
        router.push(`/client/${workspaceId}/${channelId}`);
      } else {
        router.push('/');
      }
    };

    fetchActivitySession();
  }, [router]);

  return null;
}
