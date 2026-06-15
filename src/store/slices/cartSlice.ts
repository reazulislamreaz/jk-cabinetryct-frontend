import { IParts } from "@/types/parts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  part: IParts;
  quantity: number;
  isAssemblyPrice: boolean;
  priceType: "wholesale" | "wholesaleWithTenPercent" | "contractor";
}

export interface CartState {
  items: CartItem[];
  specialInstructions: string;
}

const initialState: CartState = {
  items: [],
  specialInstructions: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        part: IParts;
        quantity: number;
        isAssemblyPrice: boolean;
        priceType: "wholesale" | "wholesaleWithTenPercent" | "contractor";
      }>
    ) => {
      const { part, quantity, isAssemblyPrice, priceType } = action.payload;
      // Ensure quantity is at least 1
      const validQuantity = Math.max(1, quantity);

      const existingItemIndex = state.items.findIndex(
        (item) => item.part._id === part._id
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item already exists - add to existing quantity
        state.items[existingItemIndex].quantity += validQuantity;
        // Update priceType in case user type changed
        state.items[existingItemIndex].priceType = priceType;
      } else {
        // Add new item
        state.items.push({
          part,
          quantity: validQuantity,
          isAssemblyPrice,
          priceType,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.part._id !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ partId: string; quantity: number }>
    ) => {
      const { partId, quantity } = action.payload;
      const item = state.items.find((item) => item.part._id === partId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.part._id !== partId);
        } else {
          item.quantity = quantity;
        }
      }
    },
    toggleAssembly: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.part._id === action.payload);
      if (item) {
        item.isAssemblyPrice = !item.isAssemblyPrice;
      }
    },
    updatePriceType: (
      state,
      action: PayloadAction<{
        partId: string;
        priceType: "wholesale" | "wholesaleWithTenPercent" | "contractor";
      }>
    ) => {
      const { partId, priceType } = action.payload;
      const item = state.items.find((item) => item.part._id === partId);
      if (item) {
        item.priceType = priceType;
      }
    },
    setSpecialInstructions: (state, action: PayloadAction<string>) => {
      state.specialInstructions = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.specialInstructions = "";
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleAssembly,
  updatePriceType,
  setSpecialInstructions,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const totalCartQuantity = (state: { cart: CartState }) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};
export const cartReducer = cartSlice.reducer;
