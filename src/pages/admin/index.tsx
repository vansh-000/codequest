"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ProblemFormData {
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  likes?: number;
  dislikes?: number;
  videoId: string;
  link: string;
}

const AdminPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProblemFormData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<ProblemFormData> = async (data) => {
    setLoading(true);
    setMessage("");

    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      setMessage("❌ Backend URL is not defined.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/problems/create-problems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Problem added successfully!");
        reset();
      } else {
        setMessage(result.error || "❌ Failed to add problem. Try again.");
      }
    } catch (error) {
      setMessage("❌ An error occurred. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-gray-800 text-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center">Admin Panel</h2>
        {message && (
          <p className="py-2 px-4 text-center text-sm font-semibold rounded-lg bg-gray-700 text-blue-400">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input {...register("title", { required: "Title is required" })} placeholder="Title" className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          <input {...register("category", { required: "Category is required" })} placeholder="Category" className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500" />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

          <select {...register("difficulty", { required: "Select difficulty" })} className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty.message}</p>}

          <input type="number" {...register("likes", { min: 0, valueAsNumber: true })} placeholder="Likes (default 0)" className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500" />

          <input type="number" {...register("dislikes", { min: 0, valueAsNumber: true })} placeholder="Dislikes (default 0)" className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500" />

          <input {...register("videoId", { required: "Video ID is required" })} placeholder="Video ID" className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500" />
          {errors.videoId && <p className="text-red-500 text-sm">{errors.videoId.message}</p>}

          <button type="submit" disabled={loading} className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Add Problem"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;