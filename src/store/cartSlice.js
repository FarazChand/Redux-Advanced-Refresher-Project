import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const newItem = action.payload;
      state.totalAmount++;

      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

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

      if (cartItem.quantity > 0) {
        state.totalAmount--;
        cartItem.quantity--;
        cartItem.total = cartItem.total - cartItem.price;
      } else {
        cartItem.total = 0;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
