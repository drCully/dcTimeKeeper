import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import { timekeeperApi } from './services/timekeeperApi';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  [timekeeperApi.reducerPath]: timekeeperApi.reducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timekeeperApi.middleware),
  devTools: true,
});

export default store;
