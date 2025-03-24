import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { authModalState } from "@/atoms/authModalAtom";
import ProblemsTable from "@/components/problemsTable/problemsTable";
import Topbar from "@/components/Topbar/topbar";
import useHasMounted from "@/hooks/useHasMounted";
import { AlertTriangle, BookOpen, Check } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();
  const router = useRouter();
  const authState = useRecoilValue(authModalState);
  const setAuthState = useSetRecoilState(authModalState);

  // Redirect to login if no user is authenticated
  useEffect(() => {
    if (!authState.user) {
      setAuthState((prev) => ({ ...prev, isOpen: true, type: "login" }));
      router.push("/auth");
    }
  }, [authState.user, router, setAuthState]);

  if (!hasMounted || !authState.user) return null;

  return (
    <>
      <main className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <Topbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                ONE STEP SOLUTION FOR YOUR CODING EXAMS
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Master the art of problem-solving with our carefully curated
              collection of challenges.
            </p>
          </div>

          <div className="flex justify-center gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col items-center w-40">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-3">
                <AlertTriangle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                457
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Problems
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col items-center w-40">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-3">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                125
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Solved
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col items-center w-40">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mb-3">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                30
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Concepts
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Featured Problems
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tackle these selected challenges to improve your skills
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th scope="col" className="px-1 py-3 w-0 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Difficulty
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Solution
                    </th>
                  </tr>
                </thead>
                <ProblemsTable setLoadingProblems={setLoadingProblems} />
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
