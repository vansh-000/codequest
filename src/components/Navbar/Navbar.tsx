import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Button from "../UI/Button";
import { Menu, X } from "lucide-react";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setAuthModalState((prev: any) => ({ ...prev, isOpen: true }));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between sm:px-12 px-4 py-3">
          <Link href="" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="CodeQuest"
              height={45}
              width={45}
              className="transition-transform duration-300 hover:scale-105"
            />
            <span className="text-2xl font-bold text-white tracking-tight">
              CODE<span className="text-blue-400">QUEST</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="">Problems</NavLink>
            <NavLink href="">Contests</NavLink>
            <NavLink href="">Leaderboard</NavLink>
            <Button
              onClick={handleClick}
              label="Login"
              variant="primary"
            />
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-4 py-3 space-y-4">
              <MobileNavLink href="/problems" onClick={() => setMobileMenuOpen(false)}>
                Problems
              </MobileNavLink>
              <MobileNavLink href="/contests" onClick={() => setMobileMenuOpen(false)}>
                Contests
              </MobileNavLink>
              <MobileNavLink href="/leaderboard" onClick={() => setMobileMenuOpen(false)}>
                Leaderboard
              </MobileNavLink>
              <div className="pt-2">
                <Button
                  onClick={() => {
                    handleClick();
                    setMobileMenuOpen(false);
                  }}
                  label="Login"
                  variant="primary"
                  fullWidth={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors font-medium"
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({
  href,
  children,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      className="block text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;