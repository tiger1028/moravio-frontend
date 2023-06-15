import React, { useEffect, useState } from 'react';
import { LoadingComponent } from '../Loading';

interface GiphyCardProps {
  giphy: string;
}

export const GiphyCardComponent: React.FC<GiphyCardProps> = ({ giphy }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (giphy) {
      setIsLoading(true);
    }
  }, [giphy]);

  if (giphy) {
    return (
      <div className="relative w-[200px] h-[200px] inline-block m-4 border-2 border-red-600 overflow-auto">
        <img
          className="inline w-full h-full"
          src={giphy}
          alt="Giphy"
          onLoad={handleLoad}
        />
        {isLoading && <LoadingComponent />}
      </div>
    );
  } else {
    return <></>;
  }
};
