import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import Logout from "../UI/LogoutBtn";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/timer";

interface TopbarProps {
  problemPage?: boolean;
  problemId?: string;
  problemIds?: string[];
}

const Topbar: React.FC<TopbarProps> = ({ problemPage, problemId, problemIds }) => {
  const [user, setUser] = useState<any>(null);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const currentIndex = problemIds?.indexOf(problemId || "") ?? -1;

  return (
    <div className="relative top-0 left-0 w-full z-50">
      <nav
        className={`flex h-[50px] w-full shrink-0 items-center px-2 sm:px-4 ${problemPage ? "bg-dark-layer-1 text-dark-gray-7" : "shadow-md"}`}
      >
        <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
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
                className={`flex items-center justify-center rounded h-8 w-8 transition-colors
                  ${currentIndex <= 0
                    ? "bg-dark-fill-2 cursor-not-allowed"
                    : "bg-dark-fill-3 hover:bg-dark-fill-2 cursor-pointer"
                  }`}
                onClick={() => {
                  if (currentIndex > 0 && problemIds) {
                    router.push(`/problems/${problemIds[currentIndex - 1]}`);
                  }
                }}
                disabled={currentIndex <= 0}
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
                className={`flex items-center justify-center rounded h-8 w-8 transition-colors
                  ${currentIndex < 0 || currentIndex >= (problemIds?.length ?? 0) - 1
                    ? "bg-dark-fill-2 cursor-not-allowed"
                    : "bg-dark-fill-3 hover:bg-dark-fill-2 cursor-pointer"
                  }`}
                onClick={() => {
                  if (currentIndex >= 0 && problemIds && currentIndex < problemIds.length - 1) {
                    router.push(`/problems/${problemIds[currentIndex + 1]}`);
                  }
                }}
                disabled={currentIndex < 0 || currentIndex >= (problemIds?.length ?? 0) - 1}
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
                    ${showProfileTooltip
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
