import { useContext } from 'react';

import { AppContext } from '../app/client/layout';
import Avatar from './Avatar';

const WorkspaceSwitcher = () => {
  const { workspace } = useContext(AppContext);

  return (
    <div className="w-9 h-9 mb-[5px] cursor-pointer">
      <Avatar
        width={36}
        borderRadius={8}
        fontSize={20}
        fontWeight={700}
        data={{ name: workspace.name, image: workspace.image }}
      />
    </div>
  );
};

export default WorkspaceSwitcher;
