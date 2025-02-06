import { useDispatch, useSelector } from "react-redux";

import { getCard } from "./cartSlice";
import CartItem from "./CartItem";
import Button from "../../ui/Button";
import EmptyCart from "./EmptyCart";
import { clearCart } from "./cartSlice";
function Cart() {
  const userName = useSelector((state) => state.user.userName);
  const card = useSelector(getCard);
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-3">
      {card.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
          <ul className="mt-7 divide-y divide-stone-200 border-b">
            {card.map((pizza) => (
              <CartItem pizza={pizza} key={pizza.pizzaId} />
            ))}
          </ul>
          <div className="mt-6 space-x-5">
            <Button to="/order/new" type="primary">
              Order Pizzas
            </Button>
            <Button type="secondary" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
