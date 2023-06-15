import { PrevSVG, NextSVG } from 'assets/svgs';
import React, { useEffect, useState } from 'react';

interface PaginationProps {
  pageCount: number;
  page: number;
  onChange: (value: number) => void;
}

interface ButtonProps {
  type: 'Prev' | 'Page' | 'Next';
  label: string;
  disabled: boolean;
  active?: boolean;
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  type,
  label,
  disabled,
  active,
  onClick,
}) => {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-l border ${
        !disabled ? 'hover:bg-gray-300 cursor-pointer' : 'cursor-not-allowed'
      } ${active && 'bg-gray-300'}`}
      onClick={onClick}
    >
      {type === 'Prev' && <PrevSVG />}
      {label}
      {type === 'Next' && <NextSVG />}
    </button>
  );
};

export const PaginationComponent: React.FC<PaginationProps> = ({
  pageCount,
  page,
  onChange,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    if (pageCount <= 5) {
      setPages(new Array(pageCount).fill(0).map((_, index) => index));
    } else {
      if (page <= 2) {
        setPages([0, 1, 2, -1, pageCount - 1]);
      } else if (page > pageCount - 4) {
        setPages([0, -1, pageCount - 3, pageCount - 2, pageCount - 1]);
      } else {
        setPages([0, -1, page - 1, page, page + 1, -1, pageCount - 1]);
      }
    }
  }, [page, pageCount]);

  const handlePrevClick = () => {
    if (page > 0) {
      onChange(page - 1);
    }
  };

  const handleClick = (selectedPage: number) => {
    if (selectedPage !== -1) {
      onChange(selectedPage);
    }
  };

  const handleNextClick = () => {
    if (page < pageCount - 1) {
      onChange(page + 1);
    }
  };

  if (pageCount) {
    return (
      <div className="flex flex-col items-center">
        <div className="inline-flex mt-2 xs:mt-0">
          <ButtonComponent
            type="Prev"
            label="Prev"
            disabled={page === 0}
            onClick={handlePrevClick}
          />
          {pages.map((pageIndex, index) => (
            <ButtonComponent
              key={index}
              type="Page"
              label={pageIndex === -1 ? '...' : (pageIndex + 1).toString()}
              disabled={pageIndex === -1}
              active={page === pageIndex}
              onClick={() => handleClick(pageIndex)}
            />
          ))}
          <ButtonComponent
            type="Next"
            label="Next"
            disabled={page === pageCount - 1}
            onClick={handleNextClick}
          />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
