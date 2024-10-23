'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import SidebarButton from './SidebarButton';
import Hash from './icons/Hash';
import Threads from './icons/Threads';
import Send from './icons/Send';
import CaretDown from './icons/CaretDown';
import IconButton from './IconButton';
import Refine from './icons/Refine';
import Compose from './icons/Compose';
import ArrowDropdown from './icons/ArrowDropdown';

const [minWidth, defaultWidth] = [180, 278];

type SidebarProps = {
  layoutWidth: number;
};

const Sidebar = ({ layoutWidth }: SidebarProps) => {
  const maxWidth = useMemo(() => layoutWidth - 304, [layoutWidth]);
  const [width, setWidth] = useState<number>(0);
  const active = false;

  const isDragged = useRef(false);

  useEffect(() => {
    if (!layoutWidth) return;

    window.addEventListener('mousemove', (e) => {
      if (!isDragged.current) {
        return;
      }

      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
      document.querySelectorAll('button').forEach((el) => {
        el.setAttribute('style', 'cursor: col-resize');
      });

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 1.3;
        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener('mouseup', () => {
      document.body.style.userSelect = 'auto';
      document.body.style.cursor = 'auto';
      document.querySelectorAll('button').forEach((el) => {
        el.removeAttribute('style');
      });
      isDragged.current = false;
    });

    return () => {
      window.removeEventListener('mousemove', () => null);
      window.removeEventListener('mouseup', () => null);
    };
  }, [layoutWidth, maxWidth]);

  useEffect(() => {
    if (!layoutWidth) return;
    if (width) {
      localStorage.setItem('sidebarWidth', String(width));
    } else {
      const savedWidth =
        parseInt(localStorage.getItem('sidebarWidth') as string) ||
        defaultWidth;
      setWidth(savedWidth > maxWidth ? maxWidth : savedWidth);
    }
  }, [width, maxWidth]);

  if (!layoutWidth) return null;

  return (
    <div
      style={{ width: `${width}px` }}
      className="relative px-2 flex flex-col flex-shrink-0 gap-3 min-w-0 min-h-0 max-h-[calc(100vh-44px)] bg-[#10121499] border-r-[1px] border-solid border-r-[#797c814d]"
    >
      <div className="pl-1 w-full h-[49px] flex items-center justify-between">
        <div className="max-w-[calc(100%-80px)]">
          <button className="w-fit max-w-full rounded-md py-[3px] px-2 flex items-center text-white hover:bg-hover-gray">
            <span className="truncate text-[18px] font-[900] leading-[1.33334]">
              Write the Docs
            </span>
            <div className="flex-shrink-0">
              <CaretDown size={18} color="var(--primary)" />
            </div>
          </button>
        </div>
        <div className="flex ">
          <IconButton
            icon={<Refine color="var(--icon-gray)" />}
            className="w-9 h-9 hover:bg-hover-gray"
          />
          <IconButton
            icon={<Compose color="var(--icon-gray)" />}
            className="w-9 h-9 hover:bg-hover-gray"
          />
        </div>
      </div>
      <div className="w-full flex flex-col">
        <SidebarButton
          icon={Threads}
          iconSize="lg"
          title="Threads"
          active={true}
        />
        <SidebarButton
          icon={Send}
          iconSize="lg"
          title="Drafts & sent"
          active={active}
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="h-7 -ml-1.5 flex items-center px-4 text-[15px] leading-7">
          <button className="hover:bg-hover-gray rounded-md">
            <ArrowDropdown color="var(--icon-gray)" />
          </button>
          <button className="flex px-[5px] max-w-full rounded-md text-sidebar-gray font-medium hover:bg-hover-gray">
            Channels
          </button>
        </div>
        <SidebarButton icon={Hash} title="ai" active={active} />
        <SidebarButton icon={Hash} title="announcements" active={active} />
        <SidebarButton icon={Hash} title="career-advice" active={active} />
        <SidebarButton
          icon={Hash}
          title="community-help-wanted"
          active={active}
          boldText={true}
        />
        <SidebarButton icon={Hash} title="community-showcase" active={active} />
        <SidebarButton icon={Hash} title="doc-reviews" active={active} />
      </div>
      {/* Handle */}
      <div
        className="absolute -right-1 w-2 h-full bg-transparent cursor-col-resize"
        onMouseDown={() => {
          isDragged.current = true;
        }}
      />
    </div>
  );
};

export default Sidebar;
