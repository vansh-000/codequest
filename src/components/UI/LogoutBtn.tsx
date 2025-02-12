import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";

const Logout: React.FC = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const router = useRouter();

    const handleLogout = () => {
        signOut();
        router.push("/auth");
    };
    return (
        <button className='bg-dark-fill-3 py-1.5 flex px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogout}>
            <p>Logout</p>
        </button>
    );
};
export default Logout;
