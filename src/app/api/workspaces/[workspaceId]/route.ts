import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ workspaceId: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  const workspaceId = (await params).workspaceId;

  if (!workspaceId || Array.isArray(workspaceId)) {
    return NextResponse.json(
      { error: 'Invalid workspace ID' },
      { status: 400 }
    );
  }

  try {
    // Check if the user is a member of the workspace
    const membership = await prisma.membership.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
    });

    if (!membership) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch the workspace along with related data
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        channels: true,
        memberships: true,
        invitations: {
          where: { acceptedAt: null },
        },
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      );
    }

    // Fetch the other workspaces the user is a member of
    const memberships = await prisma.membership.findMany({
      where: {
        userId,
      },
      include: {
        workspace: {
          include: {
            _count: {
              select: { memberships: true },
            },
            memberships: {
              take: 5,
            },
            channels: {
              take: 1,
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const otherWorkspaces = memberships
      .map((membership) => {
        const { workspace } = membership;
        return {
          id: workspace.id,
          name: workspace.name,
          image: workspace.image,
          firstChannelId: workspace.channels[0].id,
        };
      })
      .filter((w) => w.id !== workspaceId);

    return NextResponse.json({ workspace, otherWorkspaces }, { status: 200 });
  } catch (error) {
    console.error('Error fetching workspace:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
