"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Logout from "@/components/UI/LogoutBtn";

interface Problem {
  _id: string;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  order: number;
}

const ProblemListPage: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          if (parsedUser.role === "user") {
            router.push("/");
          } else {
            fetchProblems();
          }
        } else {
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error parsing storedUser:", error);
        localStorage.removeItem("user");
        router.push("/admin");
      }
    }
  }, [router]);

  const fetchProblems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/problems/get-problems`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch problems");
      }

      console.log()
      const data = await response.json();
      console.log(data.message);
      setProblems(data.message);
    } catch (error) {
      setError("Error fetching problems");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProblem = (id: string) => {
    router.push(`/admin/edit-problem/${id}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-700";
      case "Medium":
        return "bg-yellow-600";
      case "Hard":
        return "bg-red-700";
      default:
        return "bg-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/admin/add-problem")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add New Problem
            </button>
            <Logout />
          </div>
        </div>

        {error && (
          <div className="bg-red-800 text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-white text-xl">Loading problems...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <div
                key={problem._id}
                onClick={() => handleEditProblem(problem._id)}
                className="bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{problem.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">Category: {problem.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Order: {problem.order}</span>
                  <button className="px-3 py-1 bg-blue-600 rounded-lg text-sm hover:bg-blue-700">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && problems.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-white text-xl">No problems found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemListPage;