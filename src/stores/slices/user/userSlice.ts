import { Profile, User } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface UserState {
  data: User | null;
}

const initialState: UserState = {
  data: {
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
    membership: 0,
    balance: 0,
    image: "",
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = null;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data.balance = action.payload;
      }
    },
    updateMembership: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data.membership = action.payload;
      }
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      if (state.data) {
        state.data.name = action.payload.name;
        state.data.email = action.payload.email;
        state.data.password = action.payload.password;
      }
    }
  },
});

export const { saveUser, removeUser, updateBalance, updateMembership, updateProfile } = userSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedReducer;
