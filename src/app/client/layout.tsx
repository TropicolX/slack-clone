'use client';
import { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
  params: {
    workspaceId: string;
    channelId: string;
  };
}

const Layout = ({ children, params }: LayoutProps) => {
  // saves last workspace/ page state in local storage
  return <div>{children}</div>;
};

export default Layout;
