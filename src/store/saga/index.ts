import { all } from 'redux-saga/effects';
import { giphySaga, giphySagaActions } from './giphy.saga';

export function* appSaga() {
  yield all([giphySaga()]);
}

export const appSagaActions = {
  giphy: giphySagaActions,
};
