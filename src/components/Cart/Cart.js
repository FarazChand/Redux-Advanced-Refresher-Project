import { UseSelector, useSelector } from "react-redux";

import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(`in cart.js`);
  console.log(cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.length >= 1 &&
          cartItems.map((item) => (
            <CartItem
              item={{
                title: item.title,
                total: item.total,
                price: item.price,
                quantity: item.quantity,
                id: item.id,
              }}
              key={item.id}
            />
          ))}

        {cartItems.length === 0 && <h3>No items yet.</h3>}

        {console.log(cartItems)}

        {/* <CartItem
          item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }}
        /> */}
      </ul>
    </Card>
  );
};

export default Cart;
