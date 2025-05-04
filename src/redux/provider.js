"use client";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";



const Provider = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>{() => <>{children}</>}</PersistGate>
    </ReduxProvider>
  );
};

export default Provider;
