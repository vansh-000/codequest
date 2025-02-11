import React from "react";
import { X } from 'lucide-react';
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
	return (
		<>
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-40"></div>
			<div className="w-full sm:w-[450px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
				<div className="relative w-full h-full mx-auto flex items-center justify-center">
					<div className="bg-gray-900 rounded-2xl shadow-2xl w-full p-6 mx-4 border border-gray-700">
						<div className="flex justify-end p-2">
							<button
								type="button"
								className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-700 hover:text-red-400 text-gray-400 transition-colors duration-200"
							>
								<X className="w-5 h-5" />
							</button>
						</div>
						<div className="px-2 pb-2">
							<ResetPassword />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthModal; 
