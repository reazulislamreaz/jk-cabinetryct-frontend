import { createSelector } from "@reduxjs/toolkit";
import { CartState } from "../slices/cartSlice";
// Define selector for cart items
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

// Define selector for special instructions
export const selectSpecialInstructions = (state: { cart: CartState }) =>
  state.cart.specialInstructions;

// Define selector for cart totals
export const selectCartTotals = createSelector([selectCartItems], (items) => {
  const subtotal = items.reduce((sum, item) => {
    // Use the correct price based on priceType (contractor or wholesale)
    let itemPrice = 0;
    if (typeof item.part.price === "object") {
      itemPrice =
        item.part.price[item.priceType] || item.part.price.wholesale || 0;
    } else {
      itemPrice = item.part.price || 0;
    }
    const itemTotal = itemPrice * item.quantity;

    // Add assembly cost if required
    const assemblyCost = item.isAssemblyPrice
      ? (item.part.assemblyPrice || 0) * item.quantity
      : 0;

    return sum + itemTotal + assemblyCost;
  }, 0);

  // Shipping cost - will be set separately from API
  const shippingCost = 0;

  const total = subtotal + shippingCost;
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return { subtotal, shippingCost, total, itemCount };
});

// Define selector for assembly states
export const selectAssemblyStates = createSelector(
  [selectCartItems],
  (items) => {
    const assemblyStates: Record<string, boolean> = {};
    items.forEach((item) => {
      assemblyStates[item.part._id] = item.isAssemblyPrice || false;
    });
    return assemblyStates;
  }
);

// Define selector for checking if an item is in cart
export const selectIsInCart = (partId: string) =>
  createSelector([selectCartItems], (items) => {
    return items.some((item) => item.part._id === partId);
  });
