import React from 'react';
import { GiphyCardComponent } from '../GiphyCard';

interface GiphyListProps {
  giphyList: string[];
}

export const GiphyListComponent: React.FC<GiphyListProps> = ({ giphyList }) => {
  return (
    <>
      {giphyList.map((giphy, index) => (
        <GiphyCardComponent key={index} giphy={giphy} />
      ))}
    </>
  );
};
