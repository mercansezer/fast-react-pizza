import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Button from "../../ui/Button";
import { clearCart, getCard, getTotalPizzaPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helper";
import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import { fetchAddress } from "../user/userSlice";
import store from "../../store";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting";
  const dispatch = useDispatch();
  const cart = useSelector(getCard);
  const totalPizzaPrice = useSelector(getTotalPizzaPrice);
  const formErrors = useActionData();
  const [isPriority, setIsPriority] = useState(false);
  const calculatedPrice = isPriority
    ? totalPizzaPrice + (totalPizzaPrice * 20) / 100
    : totalPizzaPrice;

  if (cart.length <= 0)
    return (
      <div>
        {" "}
        <Link
          to="/menu"
          className="mt-5 inline-block border-b border-transparent text-blue-500 hover:border-blue-500"
        >
          &larr; Back to menu{" "}
        </Link>
        <p className="mt-3 text-base font-semibold">
          Your cart is still empty. Start adding some pizzas :)
        </p>
      </div>
    );
  return (
    <div className="px-6 py-8">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <div>
        <Form method="POST">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40" htmlFor="customer">
              First Name
            </label>
            <input
              required
              className="input w-full"
              id="customer"
              type="text"
              name="customer"
              defaultValue={user.userName}
            />
          </div>
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40" htmlFor="phone">
              Phone Number
            </label>
            <div className="w-full">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="input w-full"
              />

              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          </div>
          <div className="relative mb-7 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              defaultValue={user.address}
              className="input w-full"
            />
            <input
              type="hidden"
              name="position"
              value={
                user.position.latitude && user.position.longitude
                  ? ` ${(user.position.latitude, user.position.longitude)}`
                  : ""
              }
            />
            <span className="z-9999 top-6.2 absolute right-0 top-[30px] sm:top-0">
              {user.address ? (
                ""
              ) : (
                <Button
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Position
                </Button>
              )}
            </span>
          </div>
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              onChange={(e) => setIsPriority(e.target.checked)}
              className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
              //accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2
            />
            <label htmlFor="priority" className="font-medium">
              Would you like to give priority to your order ?
            </label>
          </div>
          <Button type="primary">
            {isSubmitting
              ? "Placing Order..."
              : `Order now for ${formatCurrency(calculatedPrice)}`}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
