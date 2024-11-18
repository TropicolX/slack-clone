import Image from 'next/image';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { SignOutButton } from '@clerk/nextjs';

import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import prisma from '@/lib/prisma';
import WorkspaceList from '@/components/WorkspaceList';

export default async function Home() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const memberships = await prisma.membership.findMany({
    where: {
      userId: user!.id,
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

  const workspaces = memberships.map((membership) => {
    const { workspace } = membership;
    return {
      id: workspace.id,
      name: workspace.name,
      image: workspace.image,
      memberCount: workspace._count.memberships,
      firstChannelId: workspace.channels[0].id,
    };
  });

  const invitations = await prisma.invitation.findMany({
    where: {
      email: userEmail,
      acceptedAt: null,
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
        },
      },
    },
  });

  const processedInvitations = invitations.map((invitation) => {
    const { workspace } = invitation;
    return {
      id: workspace.id,
      name: workspace.name,
      image: workspace.image,
      memberCount: workspace._count.memberships,
      token: invitation.token,
    };
  });

  async function acceptInvitation(formData: FormData) {
    'use server';
    const token = String(formData.get('token'));
    const invitation = await prisma.invitation.findUnique({
      where: { token },
    });

    await prisma.membership.create({
      data: {
        userId: user!.id,
        email: userEmail!,
        workspace: {
          connect: { id: invitation!.workspaceId },
        },
        role: 'user',
      },
    });

    await prisma.invitation.update({
      where: { token },
      data: {
        acceptedAt: new Date(),
        acceptedById: user!.id,
      },
    });

    const workspace = await prisma.workspace.findUnique({
      where: { id: invitation!.workspaceId },
      select: {
        id: true,
        channels: {
          take: 1,
          select: {
            id: true,
          },
        },
      },
    });

    redirect(`/client/${workspace!.id}/${workspace!.channels[0].id}`);
  }

  async function launchChat(formData: FormData) {
    'use server';
    const workspaceId = formData.get('workspaceId');
    const channelId = formData.get('channelId');
    redirect(`/client/${workspaceId}/${channelId}`);
  }

  async function goToGetStartedPage() {
    'use server';
    redirect('/get-started');
  }

  return (
    <div className="font-lato min-h-screen text-white">
      <Navbar action={goToGetStartedPage} />
      <section className="mt-9 max-w-[62.875rem] mx-auto px-[4vw]">
        {/* Workspaces */}
        <div className="flex items-center gap-1 mb-6">
          <Image
            src="https://a.slack-edge.com/6c404/marketing/img/homepage/bold-existing-users/waving-hand.gif"
            width={52}
            height={56}
            alt="waving-hand"
            unoptimized
          />
          <h1 className="text-[40px] sm:text-[55.5px] leading-[1.12] font-outfit font-semibold">
            Welcome back
          </h1>
        </div>
        <div className="mb-12">
          {workspaces.length > 0 ? (
            <WorkspaceList
              title={`Workspaces for ${userEmail}`}
              workspaces={workspaces}
              action={launchChat}
              actionText="Launch Slack"
            />
          ) : (
            <p className="text-lg font-bold pt-4">
              You are not a member of any workspaces yet.
            </p>
          )}
        </div>
        {/* Create new workspace */}
        <div className="rounded-[9px] mb-12 border-[#fff3] border-4">
          <div className="flex flex-col sm:grid items-center bg-[#fff] p-4 grid-rows-[1fr] grid-cols-[200px_1fr_auto] rounded-[5px]">
            <Image
              src="https://a.slack-edge.com/613463e/marketing/img/homepage/bold-existing-users/create-new-workspace-module/woman-with-laptop-color-background.png"
              width={200}
              height={121}
              className="rounded-[5px] m-[-1rem_-1rem_-47px]"
              alt="woman-with-laptop"
            />
            <p className="mt-[50px] text-center sm:text-start mb-3 sm:my-0 pr-4 tracking-[.02em] text-[17.8px] text-black">
              <strong>
                {workspaces.length > 0
                  ? 'Want to use Slack with a different team?'
                  : 'Want to get started with Slack?'}
              </strong>
            </p>
            <form action={goToGetStartedPage}>
              <Button type="submit" variant="secondary">
                Create a new workspace
              </Button>
            </form>
          </div>
        </div>
        {/* Invitations */}
        <div className="mb-12">
          {processedInvitations.length > 0 && (
            <WorkspaceList
              title={`Invitations for ${userEmail}`}
              workspaces={processedInvitations}
              action={acceptInvitation}
              actionText="Accept invite"
              buttonVariant="secondary"
            />
          )}
        </div>
        <SignOutButton redirectUrl="/sign-in">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-12">
            <p className="mr-2 text-lg leading-[1.555] tracking-[-.0012em]">
              Not seeing your workspace?
            </p>
            <button className="text-lg leading-[1.555] tracking-[.012em] text-[#36c5f0] ml-2 flex items-center gap-[9px]">
              <span>Try using a different email</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[19px] h-[13px]"
                fill="none"
              >
                <path
                  d="M1 6a.5.5 0 0 0 0 1V6zM12.854.646a.5.5 0 0 0-.708.708l.708-.708zM18 6.5l.354.354a.5.5 0 0 0 0-.708L18 6.5zm-5.854 5.146a.5.5 0 0 0 .708.708l-.708-.708zM1 7h16.5V6H1v1zm16.646-.854l-5.5 5.5.708.708 5.5-5.5-.708-.708zm-5.5-4.792l2.75 2.75.708-.708-2.75-2.75-.708.708zm2.75 2.75l2.75 2.75.708-.708-2.75-2.75-.708.708z"
                  fill="#36c5f0"
                />
              </svg>
            </button>
          </div>
        </SignOutButton>
      </section>
    </div>
  );
}
