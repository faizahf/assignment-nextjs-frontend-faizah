import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface MerchandiseState {
  id: number;
  stock: number;
  price: number;
  image: string;
  name: string;
  description: string;
  eventId: number;
  qty: number;
}

const initialState: MerchandiseState[] = [];

const merchandiseSlice = createSlice({
  name: "merchandise",
  initialState,
  reducers: {
    addMerchandise: (state, action: PayloadAction<MerchandiseState>) => {
      const newMerch = action.payload;
      const existingMerchIndex = state.findIndex(
        (merch) => merch.id === newMerch.id
      );

      if (existingMerchIndex !== -1) {
        state[existingMerchIndex].qty++;
      } else {
        state.push({
          id: newMerch.id,
          stock: newMerch.stock,
          price: newMerch.price,
          image: newMerch.image,
          name: newMerch.name,
          description: newMerch.description,
          eventId: newMerch.eventId,
          qty: 1,
        });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      state[action.payload].qty++;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
        state[action.payload].qty--;
    },
    removeMerchandise: (state, action: PayloadAction<number>) => {
        console.log('masuk');
        const newData = current(state).filter((merch) => merch.id !== action.payload);
        state = newData;
    },
  },
});

export const {
  addMerchandise,
  increaseQuantity,
  decreaseQuantity,
  removeMerchandise,
} = merchandiseSlice.actions;

export default merchandiseSlice.reducer;
