import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import { formatCurrency, formatDate } from "../../utils/helper";
import { calcMinutesLeft } from "../../utils/helper";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";
import { useEffect } from "react";
function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/menu");
      }
    },
    [fetcher],
  );

  const isPriority = order.priority;
  const totalPrice = order.cart.reduce(
    (acc, pizza) => acc + pizza.totalPrice,
    0,
  );

  return (
    <div>
      <div className="justify-between px-3 py-6 text-base md:flex">
        <h2 className="mb-3 text-xl font-semibold">Order #{order.id} status</h2>
        <div>
          {order.priority ? (
            <span className="mr-3 rounded-full bg-red-500 px-5 py-1 uppercase text-white">
              Priority
            </span>
          ) : (
            ""
          )}

          <span className="mr-3 rounded-full bg-green-500 px-5 py-1 text-base uppercase text-white">
            Prearing Order
          </span>
        </div>
      </div>
      <div className="my-4 mb-12 justify-between bg-stone-200 px-4 py-6 font-semibold md:flex">
        <p>ONLY {calcMinutesLeft(order.estimatedDelivery)} minutes left 😊</p>
        <p>(Estimated delivery : {formatDate(order.estimatedDelivery)} )</p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {order.cart.map((order) => (
          <OrderItem
            order={order}
            key={order.id}
            isLoadingIngredients={fetcher.state == "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === order.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-4 py-6 text-base">
        <p>Price pizza :{formatCurrency(totalPrice)}</p>
        {isPriority && (
          <p>Price priority : {formatCurrency(totalPrice * (20 / 100))}</p>
        )}

        <p className="font-semibold">
          To pay on delivery :{" "}
          {isPriority
            ? formatCurrency(totalPrice + totalPrice * (20 / 100))
            : formatCurrency(totalPrice)}{" "}
        </p>
      </div>
      {!order.priority && (
        <span className="mt-7 block text-right">
          <UpdateOrder />
        </span>
      )}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
