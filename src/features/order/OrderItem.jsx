import { formatCurrency } from "../../utils/helper";

function OrderItem({ order, ingredients, isLoadingIngredients }) {
  const { name, pizzaId, quantity, totalPrice, unitPrice } = order;

  return (
    <li className="mb-5 mt-4">
      <div className="md:text-xls flex justify-between space-y-1">
        <p>
          {quantity}x {name}
        </p>

        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p>{isLoadingIngredients ? "Loading..." : `${ingredients.join(", ")}`}</p>
    </li>
  );
}

export default OrderItem;
