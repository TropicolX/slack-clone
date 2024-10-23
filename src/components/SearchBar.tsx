'use client';
import { useState } from 'react';

import Search from './icons/Search';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="flex items-center justify-start flex-[2_1_0] min-w-[17.5rem] max-w-[62.5rem] h-7 px-2 rounded-md bg-[#f8f8f840]">
      <Search size={15} color="var(--primary)" />
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Write the Docs"
        autoComplete="off"
        className="h-full pb-[2.2px] bg-transparent px-2 outline-none text-white placeholder:text-white placeholder:text-[13px] placeholder:leading-[1.38463] disabled:cursor-default"
        maxLength={60}
      />
    </div>
  );
};

export default SearchBar;
