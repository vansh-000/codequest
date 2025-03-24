import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Ensure token is extracted only after the router is ready
  if (router.isReady && !token) {
    setTimeout(() => {
      const urlToken = router.query.token as string;
      if (urlToken) {
        setToken(urlToken);
        console.log("✅ Token set:", urlToken);
      } else {
        console.log("❌ Token is still undefined");
        toast.error("Invalid or missing reset token.");
      }
    }, 2000);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/users/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Password reset successful!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
      >
        <h3 className="text-2xl font-bold text-white text-center">
          Reset Password
        </h3>
        <p className="text-center text-gray-400">Token: {token || "Loading..."}</p>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border-2 rounded-lg p-3 bg-gray-700 text-white w-full"
          placeholder="Enter new password"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
