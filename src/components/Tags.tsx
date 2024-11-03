import { ReactNode, useState } from 'react';

import Close from './icons/Close';
import { isEmail } from '../lib/utils';

interface TagsProps {
  label: ReactNode;
  placeholder: string;
  values: string[];
  setValues: (values: string[]) => void;
}

const Tags = ({ label, placeholder, values: tags, setValues }: TagsProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = inputValue.trim();

    if (e.key === 'Enter' && value && isEmail(value)) {
      e.preventDefault();
      if (!tags.includes(value)) {
        const newValue = [...tags, value];
        setValues(newValue);
      }
      setInputValue('');
      return;
    }

    if (e.key === 'Backspace' && !value) {
      setValues(tags.slice(0, tags.length - 1));
      return;
    }
  };

  const handleTagRemove = (tag: string) => {
    setValues(tags.filter((t: string) => t !== tag));
  };

  return (
    <div>
      <label
        htmlFor="tags"
        className="mb-2.5 block text-base font-medium text-white"
      >
        {label}
      </label>
      <div className="select-text mt-[6px] min-h-[128px] content-start flex flex-wrap border border-[#797c8180] rounded-md p-2 pl-3 has-[:focus]:shadow-[0_0_0_1px_rgb(18,100,163),_0_0_0_5px_color-mix(in_srgb,_#1d9bd1_30%,_transparent)]">
        {tags?.map((tag: string, i) => (
          <div
            key={`tag-${tag}-${i}`}
            className="flex items-center h-min bg-white border-[1px] border-gray-300 rounded-md px-2 py-1 mr-2 my-1 text-sm font-medium text-gray-700 select-none"
          >
            <span className="mr-1">{tag}</span>
            <button
              className="text-gray-500 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-gray-500"
              onClick={() => {
                handleTagRemove(tag);
              }}
            >
              <Close color="var(--icon-gray)" size={16} />
            </button>
          </div>
        ))}
        <form className="h-full mt-2" onSubmit={(e) => e.preventDefault()}>
          <input
            className="input w-[200px] h-full outline-none bg-transparent ring-0 focus:ring-0 border-none px-0 placeholder:text-base placeholder:text-icon-gray"
            type="email"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            autoComplete="off"
          />
          <button type="submit" className="hidden"></button>
        </form>
      </div>
    </div>
  );
};

export default Tags;
