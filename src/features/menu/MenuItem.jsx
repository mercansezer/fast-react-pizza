import { formatCurrency } from "../../utils/helper";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decreaseItemQuantity,
  deleteItem,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { id, imageUrl, ingredients, name, soldOut, unitPrice } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  function handleDeleteItem() {
    dispatch(deleteItem(id));
  }

  function handleIncreaseItem() {
    dispatch(increaseItemQuantity(id));
  }
  function handleDecreaseItem() {
    dispatch(decreaseItemQuantity(id));
  }

  return (
    <li className="flex gap-2 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p>{name}</p>
        <p>{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {soldOut ? (
            <p>SOLD OUT</p>
          ) : (
            <p className="">{formatCurrency(unitPrice)}</p>
          )}

          {currentQuantity > 0 ? (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                currentQuantity={currentQuantity}
                handleIncreaseItem={handleIncreaseItem}
                handleDecreaseItem={handleDecreaseItem}
              />
              <DeleteItem handleDeleteItem={handleDeleteItem} />
            </div>
          ) : (
            !soldOut && (
              <Button type="small" onClick={handleAddItem}>
                Add to cart
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
