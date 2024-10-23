'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';

import Sidebar from './Sidebar';

interface WorkspaceLayoutProps {
  children: ReactNode;
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [layoutWidth, setLayoutWidth] = useState(0);

  useEffect(() => {
    if (!layoutRef.current) {
      return;
    }
    setLayoutWidth(layoutRef.current.clientWidth);
  }, [layoutRef]);

  return (
    <div
      ref={layoutRef}
      className="relative flex mr-1 mb-1 rounded-md overflow-hidden border border-solid border-[#797c814d]"
    >
      {/* Sidebar */}
      <Sidebar layoutWidth={layoutWidth} />
      {layoutWidth > 0 && <div className="bg-[#1a1d21] grow">{children}</div>}
    </div>
  );
};

export default WorkspaceLayout;
