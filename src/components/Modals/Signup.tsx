import React, { useState } from "react";
import Button from "../UI/Button";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Signup: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.username)
      return toast.error("Please fill all fields");

    setLoading(true);
    toast.loading("Creating your account", {
      position: "top-center",
      toastId: "loadingToast",
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        }
      );

      const data = await response.json();
      if (!response.ok)
        // throw new Error(data?.message || "Registration failed");
        throw data;

      // Update auth state & close modal
      setAuthModalState((prev) => ({
        ...prev,
        isOpen: false, // Close modal after successful signup
        user: {
          userId: data.userId,
          username: data.username,
          email: data.email,
        },
      }));

      // Store tokens securely
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Reset form
      setInputs({
        email: "",
        username: "",
        password: "",
        role: "user",
      });

      toast.success("Account created successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      router.push("/");
    } catch (error: any) {
      const errorMessage = error?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "top-center" });
      if (error?.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err: string) => {
          toast.error(err, { position: "top-center" });
        });
      }
    } finally {
      setLoading(false);
      toast.dismiss("loadingToast");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6 pb-2 max-w-md mx-auto">
      <div className="flex justify-center">
        <h3 className="inline-flex items-center text-2xl md:text-3xl font-bold text-white">
          Register
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
          onChange={handleChangeInput}
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="email@example.com"
          required
        />
      </div>

      <div>
        <label
          htmlFor="username"
          className="text-sm md:text-base font-medium block mb-2 text-gray-300"
        >
          Username
        </label>
        <input
          type="text"
          onChange={handleChangeInput}
          name="username"
          id="username"
          className="border-2 outline-none sm:text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="Your name"
          required
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
          onChange={handleChangeInput}
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="*******"
          required
        />
      </div>

      <div className="flex items-center justify-center">
        <Button
          fullWidth
          label={loading ? "Registering..." : "Register"}
          variant="primary"
        />
      </div>

      <div className="text-sm md:text-base font-medium text-gray-300 text-center">
        Already have an account?{" "}
        <a
          onClick={(e) => {
            e.preventDefault();
            handleClick("login");
          }}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Log In
        </a>
      </div>
    </form>
  );
};

export default Signup;
