import { authModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

const Logout: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      setAuthModalState((prev) => ({ ...prev, user: null }));
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      router.push("/auth");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-dark-fill-3 py-1.5 flex px-3 cursor-pointer rounded text-brand-orange"
      onClick={handleLogout}
      disabled={loading}
    >
      <p>{loading ? "Logging out..." : "Logout"}</p>
    </button>
  );
};

export default Logout;
