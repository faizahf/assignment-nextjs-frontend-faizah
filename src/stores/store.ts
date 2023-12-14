import { configureStore } from '@reduxjs/toolkit'
import persistedReducer from './slices/user/userSlice'
import { persistStore } from 'redux-persist';
import merchandiseReducer from './slices/merchandise/merchandiseSlice';

export const store = configureStore({
    reducer: {
      user: persistedReducer,
      merchandise: merchandiseReducer,
    },
  });
  

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

