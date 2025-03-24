import Link from "next/link";
import React, { useState } from "react";
import Button from "../UI/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";
import Image from "next/image";
import Logout from "../UI/LogoutBtn";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/timer";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const authModal = useRecoilValue(authModalState);
  const user = authModal.user;
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);

  return (
    <div className="relative top-0 left-0 w-full z-50">
      <nav
        className={`flex h-[50px] w-full shrink-0 items-center px-2 sm:px-4 ${
          problemPage ? "bg-dark-layer-1 text-dark-gray-7" : "shadow-md"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between max-w-7xl mx-auto`}
        >
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="CodeQuest"
              height={32}
              width={32}
              className="transition-transform duration-200 hover:scale-105"
            />
            <span className="text-xl font-bold text-white hidden sm:inline">
              CodeQuest
            </span>
          </Link>
          {problemPage && (
            <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-center max-w-md">
              <button
                className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer transition-colors"
                aria-label="Previous problem"
              >
                <FaChevronLeft />
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 font-medium text-dark-gray-8 hover:text-white transition-colors"
              >
                <div className="text-lg">
                  <BsList />
                </div>
                <p className="truncate">Problem List</p>
              </Link>
              <button
                className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer transition-colors"
                aria-label="Next problem"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
          <div className="flex items-center gap-x-3">
            {user && problemPage && <Timer />}
            {!user && (
              <div className="flex items-center space-x-4 flex-1 justify-end">
                <Link href="/auth">
                  <Button label="Login" variant="primary" />
                </Link>
              </div>
            )}
            {user && (
              <div
                className="relative"
                onMouseEnter={() => setShowProfileTooltip(true)}
                onMouseLeave={() => setShowProfileTooltip(false)}
              >
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="rounded-full cursor-pointer border-2 border-transparent hover:border-brand-orange transition-all"
                />
                <div
                  className={`absolute top-10 right-0 sm:left-2/4 sm:-translate-x-2/4 bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
                                    z-40 transition-all duration-200 min-w-max
                                    ${
                                      showProfileTooltip
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-0 pointer-events-none"
                                    }`}
                >
                  <p className="text-sm whitespace-nowrap">{user.email}</p>
                </div>
              </div>
            )}
            {user && <Logout />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
