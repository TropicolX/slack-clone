'use client';
import { useState } from 'react';

import Search from './icons/Search';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const [search, setSearch] = useState('');

  return (
    <div className="flex items-center justify-start flex-[2_1_0] min-w-[17.5rem] max-w-[62.5rem] h-7 px-2 rounded-md bg-[#f8f8f840]">
      <Search size={15} color="var(--primary)" />
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-full pb-[2.2px] bg-transparent px-2 outline-none text-white text-[13px] -mb-1 placeholder:text-white placeholder:text-[13px] placeholder:leading-[1.38463] disabled:cursor-default"
        maxLength={60}
      />
    </div>
  );
};

export default SearchBar;
