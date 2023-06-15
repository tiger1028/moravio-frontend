import { call, put, takeLatest } from 'redux-saga/effects';
import { GetGiphyListRequestPayload } from 'types';
import { Actions } from '../slices';
import { request } from 'utils';

function* getGiphyListRequest({
  payload,
}: {
  type: string;
  payload: GetGiphyListRequestPayload;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Generator<any> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = yield call(request, {
      url: `
      https://api.giphy.com/v1/gifs/search?api_key=${
        process.env.REACT_APP_GIPHY_API_KEY
      }&q=${payload.query}&offset=${payload.page * payload.items}&limit=${
        payload.items
      }`,
      data: '',
      method: 'GET',
    });

    const { data, pagination } = result;

    yield put(
      Actions.giphy.getListSuccess({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        list: data.map((giphy: any) =>
          giphy.images.fixed_height_downsampled.url.substring(0, 59)
        ),
        pageCount: Math.ceil(pagination.total_count / pagination.count),
      })
    );
  } catch (err) {
    yield put(Actions.giphy.getListFailure());
  }
}

function getGiphyListRequestAction(payload: GetGiphyListRequestPayload) {
  return {
    type: Actions.giphy.getListRequest().type,
    payload,
  };
}

export function* giphySaga(): Generator<unknown> {
  yield takeLatest(Actions.giphy.getListRequest().type, getGiphyListRequest);
}

export const giphySagaActions = {
  getList: getGiphyListRequestAction,
};
