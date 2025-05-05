import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./reducers/productReducer";

const combinedReducers = combineReducers({
  product: productReducer,
});

const persistedReducers = persistReducer(
  {
    key: "organic-product",
    storage,
    whitelist: ["product"],
  },
  combinedReducers
);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
