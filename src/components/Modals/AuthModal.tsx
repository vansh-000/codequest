import React, { useEffect } from "react";
import { X } from 'lucide-react';
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import ForgotPassword from "./ForgotPassword";

type AuthModalProps = {};

function useCloseModal() {
	const setAuthModal = useSetRecoilState(authModalState);

	const closeModal = () => {
		setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	return closeModal;
}

const AuthModal: React.FC<AuthModalProps> = () => {
	const authModel = useRecoilValue(authModalState);
	const handleClick = useCloseModal();

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-40"></div>
			<div className="w-full max-w-[90%] sm:max-w-[450px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
				<div className="relative w-full bg-neutral-900 rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-700">
					<div className="flex justify-end">
						<button onClick={handleClick}
							type="button"
							className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-700 hover:text-red-400 text-gray-400 transition-colors duration-200"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
					<div className="px-2 pb-2 sm:px-4 sm:pb-4">
						{authModel.type === 'login' ? <Login /> : (authModel.type === "register" ? <Signup /> : (authModel.type === "resetPassword"? <ResetPassword/>:<ForgotPassword />))}
					</div>

				</div>
			</div>
		</>
	);
};

export default AuthModal; 
