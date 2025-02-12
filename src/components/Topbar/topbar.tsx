import Link from "next/link";
import React from "react";
import Button from "../UI/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";
import { problems } from "../mockProblems/problems";
import Image from "next/image";
import Logout from "../UI/LogoutBtn";

type TopbarProps = {
    problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();

    return (
        <>
            <nav className='relative flex h-[60px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7'>
                <div className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}>
                    <Link href='/' className='flex items-center justify-center h-20'>
                        <div className='flex items-center space-x-2'>
                            <div className="bg-white rounded-full">
                                <Image src='/p2.png' alt='CodeQuest' height={50} width={50} />
                            </div>
                            <span className='text-2xl font-bold text-white'>CodeQuest</span>
                        </div>
                    </Link>
                    <div className="flex gap-x-3">
                    {!user && (
                        <div className='flex items-center space-x-4 flex-1 justify-end'>
                            <Link href='/auth'>
                                <Button label="Login" variant="primary" />
                            </Link>
                        </div>)}
                    {user && (
                        <div className='cursor-pointer group relative'>
                            <Image src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
                            <div
                                className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
                            >
                                <p className='text-sm'>{user.email}</p>
                            </div>
                        </div>
                    )}
                    {user && <Logout />}
                    </div>
                </div>
            </nav>
            <div
                className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 
		transition-all duration-300 ease-in-out'
            >
                <p className='text-sm'>Hello</p>
            </div>
        </>

    );
};
export default Topbar;
