import { configureStore } from '@reduxjs/toolkit'
import persistedReducer from './slices/user/userSlice'
import { persistStore } from 'redux-persist';

export const store = configureStore({
    reducer: {
      user: persistedReducer,
    },
  });
  

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

