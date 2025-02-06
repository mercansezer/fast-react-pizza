import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((state) => state.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((state) => state.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  deleteItem,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCard = (state) => state.cart.cart;
export const getTotalPizzaPrice = (state) =>
  state.cart.cart.reduce((acc, pizza) => acc + pizza.totalPrice, 0);

export const getTotalPizzaQuantity = (state) =>
  state.cart.cart.reduce((acc, pizza) => acc + pizza.quantity, 0);

export const getCurrentQuantityById = (id) => (state) => {
  return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
