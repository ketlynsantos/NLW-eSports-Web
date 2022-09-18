import React from 'react';

interface Props {
    label: string
    value: string
    colorValue?: string
}

export function DuoInfo({ label, value, colorValue = 'text-white'}: Props) {
  return (
    <div className="w-full mb-4 flex flex-col">
        <span className="text-[#D4D4D8] text-md mb-1">{ label }</span>
        <span className={`text-md font-bold ${colorValue}`}> { value }</span>
    </div>
  );
}