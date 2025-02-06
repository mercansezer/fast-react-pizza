import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizzaPrice, getTotalPizzaQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helper";

function CartOverview() {
  const totalPrice = useSelector(getTotalPizzaPrice);
  const pizzaQuantity = useSelector(getTotalPizzaQuantity);

  if (!pizzaQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-900 px-3 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-300">
        <span>{pizzaQuantity} PIZZAS</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">OPEN CART &rarr;</Link>
    </div>
  );
}

export default CartOverview;
