import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import {
  generateChannelId,
  generateToken,
  generateWorkspaceId,
  isEmail,
} from '@/lib/utils';

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const body = await request.json();
    const { workspaceName, channelName, emails, imageUrl } = body;

    // Validate input
    if (
      !workspaceName ||
      !channelName ||
      !Array.isArray(emails) ||
      emails.length === 0
    ) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }

    // Validate emails
    for (const email of emails) {
      if (!isEmail(email)) {
        return NextResponse.json(
          { error: `Invalid email address: ${email}` },
          { status: 400 }
        );
      }
    }

    // Create workspace
    const workspace = await prisma.workspace.create({
      data: {
        id: generateWorkspaceId(),
        name: workspaceName,
        image: imageUrl || null,
        ownerId: userId,
      },
    });

    // Create initial channel
    const channel = await prisma.channel.create({
      data: {
        id: generateChannelId(),
        name: channelName,
        workspaceId: workspace.id,
      },
    });

    // Add authenticated user as admin
    await prisma.membership.create({
      data: {
        userId: userId,
        email: userEmail!,
        workspace: {
          connect: { id: workspace.id },
        },
        role: 'admin',
      },
    });

    // Invite provided emails
    const invitations = [];
    const skippedEmails = [];
    const errors = [];

    for (const email of emails) {
      try {
        // Check if an invitation already exists
        const existingInvitation = await prisma.invitation.findFirst({
          where: {
            email,
            workspaceId: workspace.id,
            acceptedAt: null,
          },
        });

        // check if the user is already a member
        const existingMembership = await prisma.membership.findFirst({
          where: {
            email,
            workspaceId: workspace.id,
          },
        });

        if (existingInvitation) {
          skippedEmails.push(email);
          continue;
        }

        if (existingMembership) {
          skippedEmails.push(email);
          continue;
        }

        if (email === userEmail) {
          skippedEmails.push(email);
          continue;
        }

        // Generate token
        const token = generateToken();

        // Create invitation
        const invitation = await prisma.invitation.create({
          data: {
            email,
            token,
            workspaceId: workspace.id,
            invitedById: userId,
          },
        });

        invitations.push(invitation);
      } catch (error) {
        console.error(`Error inviting ${email}:`, error);
        errors.push({ email, error });
      }
    }

    // Return response
    const response = {
      message: 'Workspace created successfully',
      workspace: {
        id: workspace.id,
        name: workspace.name,
      },
      channel: {
        id: channel.id,
        name: channelName,
      },
      invitationsSent: invitations.length,
      invitationsSkipped: skippedEmails.length,
      errors,
    };

    if (errors.length > 0) {
      return NextResponse.json(response, { status: 207 });
    } else {
      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    console.error('Error creating workspace:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
