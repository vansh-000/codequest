import React, { useState } from "react";
import Button from "../UI/Button";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };
  const [inputs, setInputs] = useState({ email: "", userName: "", password: "" });

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const router = useRouter();
    if (!inputs.email || !inputs.password || !inputs.userName) return alert("Please fill all fields");
    try {
      toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.userName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6  pb-2 max-w-md mx-auto">
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
          placeholder="email@gamil.com"
        />
      </div>

      <div>
        <label
          htmlFor="userName"
          className="text-sm md:text-base font-medium block mb-2 text-gray-300"
        >
          UserName
        </label>
        <input
          type="text"
          onChange={handleChangeInput}
          name="userName"
          id="userName"
          className="border-2 outline-none sm:text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="Your name"
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
        />
      </div>

      <div className="flex items-center justify-center">
        <Button fullWidth label="Register" variant="primary" />
      </div>

      <div className="text-sm md:text-base font-medium text-gray-300 text-center">
        Already have an account? {" "}
        <a
          onClick={() => handleClick("login")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Log In
        </a>
      </div>
    </form>
  );
};

export default Signup;
