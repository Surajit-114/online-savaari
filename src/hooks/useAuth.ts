import { create } from "zustand";
export type TAuth = {
  account_email: string;
  role: string;
  access_token: string;
  refresh_token: string;
};

interface AuthStore {
  auth: TAuth;
  setAuth: (auth: TAuth) => void;
}

const useAuth = create<AuthStore>((set) => ({
  auth: {
    account_email: "",
    role: "",
    access_token: "",
    refresh_token: "",
  },
  setAuth: (auth: TAuth) => set({ auth }),
}));

export default useAuth;
