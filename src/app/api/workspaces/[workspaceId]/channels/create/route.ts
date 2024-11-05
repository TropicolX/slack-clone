import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import { generateChannelId } from '@/lib/utils';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
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
    const user = await currentUser();
    const userId = user!.id;

    const body = await request.json();
    const { name, description } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Channel name is required' },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { error: 'Access denied: Not a member of the workspace' },
        { status: 403 }
      );
    }

    // Check if the user has permission to create channels
    if (membership.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied: Insufficient permissions' },
        { status: 403 }
      );
    }

    // Check if a channel with the same name already exists in the workspace
    const existingChannel = await prisma.channel.findFirst({
      where: {
        name,
        workspaceId,
      },
    });

    if (existingChannel) {
      return NextResponse.json(
        {
          error: 'A channel with this name already exists in the workspace',
        },
        { status: 400 }
      );
    }

    // Create the new channel
    const newChannel = await prisma.channel.create({
      data: {
        id: generateChannelId(),
        name,
        description,
        workspaceId,
      },
    });

    return NextResponse.json(
      {
        message: 'Channel created successfully',
        channel: newChannel,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating channel:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
