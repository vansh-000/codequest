import { atom } from "recoil";

type UserInfo = {
  userId: string;
  username: string;
  email: string;
} | null;

export type AuthModalState = {
  isOpen: boolean;
  type: "login" | "register" | "forgotPassword" | "resetPassword";
  user: UserInfo;
};

const initalAuthModalState: AuthModalState = {
  isOpen: false,
  type: "login",
  user: null,
};

const AUTH_MODAL_KEY = "authModalState";

export const authModalState =
  (global as any)[AUTH_MODAL_KEY] ||
  ((global as any)[AUTH_MODAL_KEY] = atom<AuthModalState>({
    key: AUTH_MODAL_KEY,
    default: initalAuthModalState,
  }));
