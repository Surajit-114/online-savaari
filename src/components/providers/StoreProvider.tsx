"use client";
import { AppStore, makeStore } from "@/lib/store/store";
import { useRef, type FC } from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const StoreProvider: FC<Props> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
