import React, { ChangeEvent, useState, useEffect } from 'react';
import { GetGiphyListRequestPayload } from 'types';
import {
  GiphyListComponent,
  ItemShowCountSelectComponent,
  LoadingComponent,
  PaginationComponent,
  TimedInputComponent,
} from 'components/common';
import { ItemShowCountOptions } from 'config';

interface DashboardProps {
  giphyList: string[];
  pageCount: number;
  loading: boolean;
  updateGiphyList: (data: GetGiphyListRequestPayload) => void;
}

export const DashboardComponent: React.FC<DashboardProps> = ({
  giphyList,
  pageCount,
  loading,
  updateGiphyList,
}) => {
  const [giphyName, setGiphyName] = useState<string>('');
  const [itemShowCount, setItemShowCount] = useState<number>(
    ItemShowCountOptions[0]
  );
  const [page, setPage] = useState<number>(0);

  const handleGiphyNameChange = (value: string) => {
    setGiphyName(value);
  };

  const handleItemShowCountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemShowCount(Number(event.target.value ?? ItemShowCountOptions[0]));
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (giphyName) {
      updateGiphyList({
        query: giphyName,
        items: itemShowCount,
        page: page,
      });
    }
  }, [giphyName, page]);

  useEffect(() => {
    if (page) {
      setPage(0);
    } else if (giphyName) {
      updateGiphyList({
        query: giphyName,
        items: itemShowCount,
        page: page,
      });
    }
  }, [itemShowCount]);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-4 text-2xl">
          <TimedInputComponent time={300} onChange={handleGiphyNameChange} />
          <ItemShowCountSelectComponent
            label="Item Count:"
            options={ItemShowCountOptions}
            value={itemShowCount}
            onChange={handleItemShowCountChange}
          />
        </div>
        <PaginationComponent
          pageCount={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      </div>
      <GiphyListComponent giphyList={giphyList} />

      {loading && <LoadingComponent />}
    </div>
  );
};
