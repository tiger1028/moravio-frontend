import React, { InputHTMLAttributes } from 'react';

interface ItemShowCountSelectProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: number[];
}

export const ItemShowCountSelectComponent: React.FC<
  ItemShowCountSelectProps
> = ({ label, options, ...props }) => {
  return (
    <div>
      <strong>{label}</strong>&nbsp;&nbsp;
      <select
        className="inline-block text-right w-[150px] p-2 rounded-xl"
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
