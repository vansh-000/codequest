import React from "react";
import Button from "../UI/Button";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  return (
    <form className="space-y-6 max-w-md mx-auto">
      <div className="flex justify-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white">Reset Password</h3>
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-sm md:text-base font-medium block mb-2 text-gray-300"
        >
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </div>

      <div className="flex items-center justify-center">
        <Button fullWidth label="Reset Password" variant="primary" />
      </div>
    </form>
  );
};

export default ResetPassword;
