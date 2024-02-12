import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.cartItems = action.payload.cartItems;
    },

    addCart(state, action) {
      const newItem = action.payload;
      state.totalAmount++;

      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.changed = true;

      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = existingItem.total + existingItem.price;
      }

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          total: newItem.price,
          quantity: 1,
        });
      }
    },

    removeCart(state, action) {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      state.totalAmount--;
      state.changed = true;

      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        cartItem.total = cartItem.total - cartItem.price;
      } else {
        state.cartItems = state.cartItems.filter((item) => item !== cartItem);
        // cartItem.total = 0;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
