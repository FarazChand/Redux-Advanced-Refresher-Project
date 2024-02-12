import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

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
          body: JSON.stringify({
            cartItems: cart.cartItems,
            totalAmount: cart.totalAmount,
          }),
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
    } catch (error) {
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

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_URL}cart.json`
      );

      const cartData = await response.json();

      if (!response.ok) {
        throw new Error("Fetching cart data failed");
      }

      return cartData;
    };

    try {
      const data = await fetchData();
      dispatch(
        cartActions.replaceCart({
          cartItems: data.cartItems || [],
          totalAmount: data.totalAmount,
        })
      );
    } catch (error) {
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
