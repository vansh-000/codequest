import Topbar from "@/components/Topbar/topbar";
import Workspace from "@/components/Workspace/workspace";
import useHasMounted from "@/hooks/useHasMounted";
import { Problem } from "@/utils/types/problem";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProblemPage: React.FC = () => {
  const hasMounted = useHasMounted();
  const router = useRouter();
  const { _id } = router.query;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (!hasMounted) return null;
  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-400 p-4">Error: {error}</div>;
  if (!problem) return <div className="text-yellow-400 p-4">Problem not found</div>;

  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
};

export default ProblemPage;
