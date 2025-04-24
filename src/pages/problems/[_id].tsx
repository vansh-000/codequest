import Topbar from "@/components/Topbar/topbar";
import Workspace from "@/components/Workspace/workspace";
import useHasMounted from "@/hooks/useHasMounted";
import { Problem } from "@/utils/types/problem";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const ProblemPage: React.FC = () => {
  const hasMounted = useHasMounted();
  const router = useRouter();
  const { _id } = router.query;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [problemIds, setProblemIds] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Fetch all problem IDs
  useEffect(() => {
    const fetchAllProblems = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/problems/get-problems`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        const sortedIds = data.message.map((item: any) => item._id);
        setProblemIds(sortedIds);
      } catch (err: any) {
        console.error("Failed to fetch problem list", err);
      }
    };

    fetchAllProblems();
  }, []);

  // Fetch the specific problem
  useEffect(() => {
    if (!_id) return;

    const fetchProblem = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/problems/get-problem/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch problem");

        data.message.handlerFunction = data.message.handlerFunction?.toString();
        setProblem(data.message);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [_id]);

  const enterFullscreen = async () => {
    try {
      if (editorRef.current && editorRef.current.requestFullscreen) {
        await editorRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (err) {
      console.error("Fullscreen request failed:", err);
    }
  };

  if (!hasMounted) return null;
  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-400 p-4">Error: {error}</div>;
  if (!problem) return <div className="text-yellow-400 p-4">Problem not found</div>;

  return (
    <div ref={editorRef} className="min-h-screen bg-black text-white">
      {!isFullscreen && (
        <div className="flex items-center justify-center h-screen bg-black z-50">
          <button
            onClick={enterFullscreen}
            className="px-6 py-3 text-lg font-semibold bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Start Problem (Fullscreen)
          </button>
        </div>
      )}

      {isFullscreen && (
        <>
          <Topbar problemPage problemId={_id as string} problemIds={problemIds} />
          <Workspace problem={problem} />
        </>
      )}
    </div>
  );
};

export default ProblemPage;
