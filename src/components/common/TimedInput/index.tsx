import React, { useState, useEffect, ChangeEvent } from 'react';

interface TimedInputProps {
  time: number;
  onChange: (value: string) => void;
}

export const TimedInputComponent: React.FC<TimedInputProps> = ({
  time,
  ...props
}) => {
  const [value, setValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      timeoutId = setTimeout(() => {
        setIsTyping(false);
        props.onChange(value);
      }, time);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, isTyping]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsTyping(true);
  };

  return (
    <span>
      <strong>Giphy Name:</strong>&nbsp;&nbsp;
      <input className="p-2 rounded-xl" value={value} onChange={handleChange} />
    </span>
  );
};
