import { MerchandiseItem } from "@/types";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface MerchandiseState {
  merchs: MerchandiseItem[];
}

const initialState: MerchandiseState = {
  merchs: [],
};

const merchandiseSlice = createSlice({
  name: "merchandise",
  initialState,
  reducers: {
    addMerchandise: (state, action: PayloadAction<MerchandiseItem>) => {
      const newData = action.payload;
      console.log("new", newData);

      const existingMerchIndex = state.merchs.findIndex(
        (data) => data.merch.id === newData.merch.id
      );

      if (existingMerchIndex !== -1) {
        state.merchs[existingMerchIndex].merch.qty++;
      } else {
        state.merchs.push({
          merch: {
            id: newData.merch.id,
            stock: newData.merch.stock,
            price: newData.merch.price,
            image: newData.merch.image,
            name: newData.merch.name,
            description: newData.merch.description,
            eventId: newData.merch.eventId,
            qty: 1,
          },
        });
      }
      console.log("state add", state.merchs);
    },
    // increaseQuantity: (state, action: PayloadAction<number>) => {
    //   console.log("state", state);
    //   state[action.payload].qty++;
    // },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      console.log("state", state.merchs[action.payload]);
      state.merchs[action.payload].merch.qty--;
    },
    removeMerchandise: (state, action: PayloadAction<number>) => {
      const newData = state.merchs.filter(
        (data) => data.merch.id !== action.payload
      );
      console.log("masuk", newData);
      console.log("state", state);
      state.merchs = newData;
    },
    resetMerchandise: (state) => {
      state.merchs = [];
    },
  },
});

export const {
  addMerchandise,
  //   increaseQuantity,
  decreaseQuantity,
  removeMerchandise,
  resetMerchandise,
} = merchandiseSlice.actions;

export default merchandiseSlice.reducer;
