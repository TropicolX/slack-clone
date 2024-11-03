import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { generateToken, isEmail } from '@/lib/utils';

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

  try {
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const body = await request.json();
    const emails = body?.email;
    const workspaceId = (await params).workspaceId;

    if (!workspaceId || Array.isArray(workspaceId)) {
      return NextResponse.json(
        { error: 'Invalid workspace ID' },
        { status: 400 }
      );
    }

    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'Emails must be a non-empty array' },
        { status: 400 }
      );
    }

    // Validate each email address
    for (const email of emails) {
      if (typeof email !== 'string' || !isEmail(email)) {
        return NextResponse.json(
          { error: `Invalid email address: ${email}` },
          { status: 400 }
        );
      }
    }

    // Check if user is an admin of the workspace
    const membership = await prisma.membership.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
    });

    if (!membership || membership.role !== 'admin') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const invitations = [];
    const skippedEmails = [];
    const errors = [];

    for (const email of emails) {
      try {
        // Check if an invitation already exists
        const existingInvitation = await prisma.invitation.findFirst({
          where: {
            email,
            workspaceId,
            acceptedAt: null,
          },
        });

        // check if the email is already a member
        const existingMembership = await prisma.membership.findFirst({
          where: {
            email,
            workspaceId,
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
            workspaceId,
            invitedById: userId,
          },
        });

        invitations.push(invitation);
      } catch (error) {
        console.error(`Error inviting ${email}:`, error);
        errors.push({ email, error });
      }
    }

    const response = {
      message: 'Invitations processed',
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
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
