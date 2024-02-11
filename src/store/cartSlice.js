import React from "react";
import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./uiSlice";

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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const putCart = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}cart.json`,
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    try {
      await putCart();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
