import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { auth } from "@/firebase/firebase";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = (type: "login" | "register" | "forgotPassword") => {
		setAuthModalState((prev) => ({ ...prev, type }));
	};
	const [inputs, setInputs] = useState({ email: "", password: "" });
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
	const router = useRouter();
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password) return alert("Please fill all fields");
		try {
			const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) return;
			router.push("/");
		} catch (error: any) {
			toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
		}
	};
	useEffect(() => {
		if (error) {
			if (error.message == "Firebase: Error (auth/invalid-credential).") {
				toast.error('Invalid Credentials')
			}
			else {
				toast.error(error.message);
			}
		};
	}, [error]);

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
					className="border-2 outline-none sm:text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
					placeholder="*******"
				/>
			</div>

			<div className="flex pt-2 items-center justify-center">
				<Button fullWidth label="Login" variant="primary" />
			</div>

			<a
				onClick={() => handleClick("forgotPassword")}
				className="text-sm md:text-base block text-blue-500 cursor-pointer hover:underline w-full text-right"
			>
				Forgot Password?
			</a>

			<div className="text-sm md:text-base font-medium text-gray-300 text-center">
				Not Registered? {" "}
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
