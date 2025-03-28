import React, { useState } from "react";
import Button from "../UI/Button";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  // State for form inputs
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Function to handle modal state changes (login/register/forgotPassword)
  const handleClick = (
    type: "login" | "register" | "forgotPassword" | "resetPassword"
  ) => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  // Function to update form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      return toast.error("Please fill all fields", { theme: "dark" });
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputs),
          credentials: "include", // Important for auth handling
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // Save user data to localStorage
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      localStorage.setItem("user", JSON.stringify(data.data.user));

      // Update Recoil state
      setAuthModalState((prev) => ({
        ...prev,
        user: {
          userId: data.data.user.userId,
          username: data.data.user.username,
          email: data.data.user.email,
        },
      }));

      toast.success("Login successful!");

      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "An error occurred", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 pb-2 max-w-md mx-auto">
      <div className="flex justify-center">
        <h3 className="inline-flex items-center text-2xl md:text-3xl font-bold text-white">
          Login
        </h3>
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-sm md:text-base font-medium block mb-2 text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          onChange={handleInputChange}
          name="email"
          id="email"
          value={inputs.email}
          required
          className="border-2 outline-none sm:text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm md:text-base font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          onChange={handleInputChange}
          name="password"
          id="password"
          value={inputs.password}
          required
          className="border-2 outline-none sm:text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="*******"
        />
      </div>

      <div className="flex pt-2 items-center justify-center">
        <Button
          fullWidth
          label={loading ? "Logging in..." : "Login"}
          variant="primary"
        />
      </div>

      <a
        onClick={() => handleClick("forgotPassword")}
        className="text-sm md:text-base block text-blue-500 cursor-pointer hover:underline w-full text-right"
      >
        Forgot Password?
      </a>

      <div className="text-sm md:text-base font-medium text-gray-300 text-center">
        Not Registered?{" "}
        <a
          onClick={() => handleClick("register")}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Create account
        </a>
      </div>
    </form>
  );
};

export default Login;
