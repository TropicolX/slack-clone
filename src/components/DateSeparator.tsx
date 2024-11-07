import React from 'react';
import { DateSeparatorProps } from 'stream-chat-react';

import CaretDown from './icons/CaretDown';
import { getOrdinalSuffix } from '../lib/utils';

const DateSeparator = ({ date }: DateSeparatorProps) => {
  function formatDate(date: Date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday = date >= today;
    const isYesterday = date >= yesterday && date < today;

    if (isToday) {
      return 'Today';
    } else if (isYesterday) {
      return 'Yesterday';
    } else {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      };
      const day = date.getDate();
      const suffix = getOrdinalSuffix(day);
      return `${date.toLocaleDateString('en-US', options)}${suffix}`;
    }
  }

  return (
    <div className="relative font-lato w-full flex items-center justify-center h-10">
      <div className="select-none bg-[#1a1d21] text-channel-gray font-bold flex pr-2 pl-4 z-20 items-center h-7 rounded-[24px] text-[13px] leading-[27px] border border-[#797c814d]">
        {formatDate(date)}
        <span className="ml-1">
          <CaretDown color="var(--channel-gray)" size={13} />
        </span>
      </div>
      <div className="absolute h-[1px] w-full bg-[#797c814d] z-10" />
    </div>
  );
};

export default DateSeparator;
