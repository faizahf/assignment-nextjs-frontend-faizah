import { User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface UserState {
  data: User;
}

const initialState: UserState = {
  data: {
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
    membership: "",
    balance: 0,
    image: "",
    bookmarks: [],
    events: []
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
});

export const { saveUser } = userSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedReducer;
