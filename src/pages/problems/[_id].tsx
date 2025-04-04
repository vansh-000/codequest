import Topbar from "@/components/Topbar/topbar";
import Workspace from "@/components/Workspace/workspace";
import useHasMounted from "@/hooks/useHasMounted";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import React from "react";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
};
export default ProblemPage;

// fetch the local data
//  SSG
// getStaticPaths => it create the dynamic routes
export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({
    params: { _id: key },
  }));

  return {
    paths,
    fallback: false,
  };
}

// getStaticProps => it fetch the data

export async function getStaticProps({ params }: { params: { _id: string } }) {
  const { _id } = params;
  const problem = problems[_id];

  if (!problem) {
    return {
      notFound: true,
    };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem,
    },
  };
}
