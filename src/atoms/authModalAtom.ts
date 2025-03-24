import { atom } from "recoil";

type UserInfo = {
  userId: string;
  username: string;
  email: string;
} | null;

type AuthModalState = {
  isOpen: boolean;
  type: "login" | "register" | "forgotPassword"|"resetPassword";
  user: UserInfo;
};

const initalAuthModalState: AuthModalState = {
  isOpen: false,
  type: "login",
  user: null, // No user by default
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: initalAuthModalState,
});
