import Topbar from "@/components/Topbar/topbar";
import Workspace from "@/components/Workspace/workspace";
import useHasMounted from "@/hooks/useHasMounted";
import { Problem } from "@/utils/types/problem";
import React from "react";

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <div>
      <Topbar problemPage />
      <Workspace />
    </div>
  );
};
export default ProblemPage;
