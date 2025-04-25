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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/logout`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Logout failed!");
      }

      // remove user from the store
      setAuthModalState((prev) => ({ ...prev, user: null }));

      toast.success(data.message);
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
