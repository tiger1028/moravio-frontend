import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GiphyState = {
  list: string[];
  pageCount: number;
  loading: boolean;
};

const initialState: GiphyState = {
  list: [],
  pageCount: 0,
  loading: false,
};

const giphySlice = createSlice({
  name: 'giphy',
  initialState: initialState,
  reducers: {
    getListRequest(state: GiphyState) {
      state.loading = true;
    },
    getListSuccess(
      state: GiphyState,
      action: PayloadAction<{ list: string[]; pageCount: number }>
    ) {
      state.list = action.payload.list;
      state.pageCount = action.payload.pageCount;
      state.loading = false;
    },
    getListFailure(state: GiphyState) {
      state.loading = false;
    },
  },
});

export const giphyActions = giphySlice.actions;

export default giphySlice;
