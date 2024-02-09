import { useDispatch } from "react-redux";

import classes from "./CartButton.module.css";
import { uiActions } from "../../store/uiSlice";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const totalAmout = useSelector((state) => state.cart.totalAmount);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalAmout}</span>
    </button>
  );
};

export default CartButton;
