import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppSagaActions, RootState } from 'store';
import { GetGiphyListRequestPayload } from 'types';
import { DashboardComponent } from 'components';

export const DashboardContainer: React.FC = () => {
  const {
    list: giphyList,
    pageCount,
    loading,
  } = useSelector((state: RootState) => state.giphy);
  const dispatch = useDispatch<AppDispatch>();

  const updateGiphyList = async (queryData: GetGiphyListRequestPayload) => {
    dispatch(AppSagaActions.giphy.getList(queryData));
  };

  return (
    <DashboardComponent
      giphyList={giphyList}
      pageCount={pageCount}
      loading={loading}
      updateGiphyList={updateGiphyList}
    />
  );
};
