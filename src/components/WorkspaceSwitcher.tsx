import Image from 'next/image';
import React from 'react';

// interface WorkspaceSwitcherProps {

// }

const WorkspaceSwitcher = () => {
  return (
    <div className="w-9 h-9 mb-[5px] cursor-pointer">
      <Image
        width={36}
        height={36}
        src="https://avatars.slack-edge.com/2015-01-12/3390085545_12cd7ec3fb90fd0f5e5d_88.jpg"
        alt="Worspace image"
        className="rounded-lg"
      />
    </div>
  );
};

export default WorkspaceSwitcher;
