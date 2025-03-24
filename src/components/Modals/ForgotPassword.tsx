import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/v1/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Reset password email sent!");
      setEmail("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <h3 className="text-2xl font-bold text-white">Forgot Password</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 rounded-lg p-3 bg-gray-600 text-white w-full"
        placeholder="Enter your email"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Sending..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ForgotPassword;
