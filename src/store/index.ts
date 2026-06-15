import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import cartReducer from "./slices/cartSlice";
import messagingReducer from "./slices/messagingSlice";

// Persist configuration for cart slice
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items", "shippingMethod", "specialInstructions"],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    // Add the RTK Query API reducer
    [baseApi.reducerPath]: baseApi.reducer,

    // Add cart slice with persistence
    cart: persistedCartReducer,

    // Add messaging slice (no persistence - fresh on each session)
    messaging: messagingReducer,
  },

  // Add RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
        ],
        ignoredPaths: ["cart"],
      },
    }).concat(baseApi.middleware),

  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

// Create the persistor for the PersistGate
export const persistor = persistStore(store);

// Setup listeners for refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
