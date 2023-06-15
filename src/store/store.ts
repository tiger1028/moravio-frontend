import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { appSaga, appSagaActions } from './saga';
import { Slices, Actions } from './slices';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// create store
export const store = configureStore({
  reducer: Slices,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(appSaga);

// root state
export type RootState = ReturnType<typeof store.getState>;

// export app dispatch
export type AppDispatch = typeof store.dispatch;

// export app actions
export const AppActions = Actions;

// export app saga actions
export const AppSagaActions = appSagaActions;
