import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { formatCurrency } from "../../utils/helper";
import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "./cartSlice";

function CartItem({ pizza }) {
  const dispatch = useDispatch();

  function handleIncreaseItem() {
    dispatch(increaseItemQuantity(pizza.pizzaId));
  }
  function handleDecreaseItem() {
    dispatch(decreaseItemQuantity(pizza.pizzaId));
  }
  function handleDeleteItem() {
    dispatch(deleteItem(pizza.pizzaId));
  }
  return (
    <li className="items-center justify-between py-2 sm:flex">
      <p className="text-base">
        {pizza.quantity}&times; {pizza.name}
      </p>
      <div className="flex items-center justify-between gap-7">
        <p className="text-sm font-bold">{formatCurrency(pizza.unitPrice)}</p>
        <UpdateItemQuantity
          currentQuantity={pizza.quantity}
          handleIncreaseItem={handleIncreaseItem}
          handleDecreaseItem={handleDecreaseItem}
        />
        <DeleteItem handleDeleteItem={handleDeleteItem} />
      </div>
    </li>
  );
}

export default CartItem;
