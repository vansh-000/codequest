"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Logout from "@/components/UI/LogoutBtn";
import { BookOpen, PlusCircle, Settings } from "lucide-react";

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

      const data = await response.json();
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
        return "bg-green-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Hard":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 dark:bg-green-900";
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900";
      case "Hard":
        return "bg-red-100 dark:bg-red-900";
      default:
        return "bg-gray-100 dark:bg-gray-900";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              FACULTY DASHBOARD
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Manage and organize your coding exam collection
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex justify-center gap-6">
            <div className="bg-gray-800 shadow-md rounded-lg p-5 flex flex-col items-center w-40">
              <div className="bg-indigo-900/70 p-3 rounded-full mb-3">
                <BookOpen className="h-6 w-6 text-indigo-400" />
              </div>
              <span className="text-2xl font-bold text-white">
                {problems.length}
              </span>
              <span className="text-sm text-gray-400">Total Problems</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/admin/add-problem")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add New Problem</span>
            </button>
            <Logout />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-600 text-white p-4 rounded-lg mb-6 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-red-500" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="flex flex-col space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col space-y-3 p-4 bg-gray-700/50 rounded-xl">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-600 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-600 rounded w-20"></div>
                  </div>
                  <div className="h-3 bg-gray-600 rounded w-1/4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-600 rounded w-1/5"></div>
                    <div className="h-6 bg-gray-600 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {problems.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-8 text-center shadow-lg">
                <div className="rounded-full bg-gray-700 p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-white text-xl font-medium mb-2">No problems found</p>
                <p className="text-gray-400">Get started by adding your first problem</p>
                <button
                  onClick={() => router.push("/admin/add-problem")}
                  className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 inline-flex items-center gap-2"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Add New Problem</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {problems.map((problem) => (
                  <div
                    key={problem._id}
                    onClick={() => handleEditProblem(problem._id)}
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 hover:translate-y-[-4px] transition-all duration-300 cursor-pointer"
                  >
                    <div className={`h-2 ${getDifficultyColor(problem.difficulty)}`}></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white line-clamp-2">{problem.title}</h3>
                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center mb-4">
                        <div className={`w-8 h-8 rounded-full ${getDifficultyIcon(problem.difficulty)} flex items-center justify-center mr-3`}>
                          <span className="text-xs font-bold">{problem.order}</span>
                        </div>
                        <span className="text-gray-400">Category: {problem.category}</span>
                      </div>
                      <div className="flex justify-end">
                        <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-1">
                          <Settings className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default ProblemListPage;