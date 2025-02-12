import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";
import logo from "../public/p2.png";
import Button from "../UI/Button";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};

	return (
		<div className='flex items-center justify-between sm:px-12 px-2 md:px-4'>
			<Link href='/' className='flex items-center justify-center h-20'>
				<div className='flex items-center space-x-2'>
					<div className="bg-white rounded-full">
						<Image src='/p2.png' alt='CodeQuest' height={50} width={50} />
					</div>
					<span className='text-2xl font-bold text-white'>CODEQUEST</span>
				</div>
			</Link>
			<div className='flex items-center'>
				<Button onClick={handleClick} label="Login" variant="primary" />
			</div>
		</div>
	);
};

export default Navbar;
