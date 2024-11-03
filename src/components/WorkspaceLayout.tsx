'use client';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { AppContext } from '../app/client/layout';
import Sidebar from './Sidebar';

interface WorkspaceLayoutProps {
  children: ReactNode;
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
  const { loading } = useContext(AppContext);
  const layoutRef = useRef<HTMLDivElement>(null);
  const [layoutWidth, setLayoutWidth] = useState(0);

  useEffect(() => {
    if (!layoutRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setLayoutWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(layoutRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [layoutRef]);

  return (
    <div
      ref={layoutRef}
      className={clsx(
        'relative flex mr-1 mb-1 rounded-md overflow-hidden border border-solid',
        loading ? 'border-transparent' : 'border-[#797c814d]'
      )}
    >
      {/* Sidebar */}
      <Sidebar layoutWidth={layoutWidth} />
      {layoutWidth > 0 && <div className="bg-[#1a1d21] grow">{children}</div>}
    </div>
  );
};

export default WorkspaceLayout;
