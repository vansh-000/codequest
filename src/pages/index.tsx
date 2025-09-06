import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { authModalState } from "@/atoms/authModalAtom";
import ProblemsTable from "@/components/problemsTable/problemsTable";
import Topbar from "@/components/Topbar/topbar";
import useHasMounted from "@/hooks/useHasMounted";
import {
  AlertTriangle,
  BookOpen,
  Info,
  Code2,
  Trophy,
  Target,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle2,
  Star,
  Sparkles
} from "lucide-react";
import { FC } from "react";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();
  const router = useRouter();
  const authState = useRecoilValue(authModalState);
  const setAuthState = useSetRecoilState(authModalState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log(parsedUser);
        console.log(parsedUser.role);

        if (parsedUser) {
          setAuthState((prev: any) => ({ ...prev, user: parsedUser }));

          if (parsedUser.role === "admin") {
            router.push("/admin");
          }
        } else {
          setAuthState((prev: any) => ({ ...prev, isOpen: true, type: "login" }));
          router.push("/auth");
        }
      } catch (error) {
        console.error("Error parsing storedUser:", error);
        localStorage.removeItem("user");
        setAuthState((prev: any) => ({ ...prev, isOpen: true, type: "login" }));
        router.push("/auth");
      }
    } else {
      setAuthState((prev: any) => ({ ...prev, isOpen: true, type: "login" }));
      router.push("/auth");
    }
  }, [router, setAuthState]);

  if (!hasMounted) return null;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded-md bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-300 px-3 py-1.5 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Skip to content
      </a>

      <main
        id="main"
        className="bg-gray-50 dark:bg-gray-950 min-h-screen relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-50 dark:bg-indigo-900/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-50 dark:bg-purple-900/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-100/50 dark:bg-gray-800/5 rounded-full blur-3xl"></div>
        </div>

        <Topbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-12">

            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-4 tracking-tight">
              <span className="text-indigo-600 dark:text-indigo-400">
                ONE STEP SOLUTION FOR YOUR CODING EXAMS
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Master the art of problem-solving with our carefully curated collection of challenges.
            </p>

          </div>

          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to succeed in your coding examinations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={Shield}
                title="Secure Exam Environment"
                description="Full-screen monitoring and proctoring capabilities ensure exam integrity"
                bgColor="bg-red-600 dark:bg-red-500"
              />
              <FeatureCard
                icon={Zap}
                title="Real-time Feedback"
                description="Instant code evaluation and detailed explanations for better learning"
                bgColor="bg-amber-600 dark:bg-amber-500"
              />
              <FeatureCard
                icon={Trophy}
                title="Progress Tracking"
                description="Comprehensive analytics to monitor your improvement over time"
                bgColor="bg-green-600 dark:bg-green-500"
              />
            </div>
          </section>



          {/* Enhanced Featured Problems Section */}
          <section
            id="featured"
            className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                      Featured Problems
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tackle these selected challenges to improve your skills.
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Live Updates</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loadingProblems && (
                <div
                  role="status"
                  aria-live="polite"
                  aria-busy="true"
                  className="max-w-[1200px] mx-auto sm:w-7/12 w-full"
                >
                  {[...Array(5)].map((_, idx) => (
                    <EnhancedLoadingSkeleton key={idx} />
                  ))}
                </div>
              )}

              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60 sticky top-0 z-10">
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
          </section>
          <section aria-labelledby="exam-rules-title" className="mt-12">
              <div className="flex items-start gap-4 px-6 py-6">
                <div className="min-w-0 flex-1">
                  <h2
                    id="exam-rules-title"
                    className="text-xl font-semibold text-red-900 dark:text-red-900 mb-4 flex items-center gap-2"
                  >
                    <Shield className="w-7 h-7" />
                    Exam Rules
                  </h2>

                  <div className="space-y-4">
                    <ExamRule
                      icon={Shield}
                      title="Full-Screen Mandatory"
                      description="All questions must be attempted in full-screen mode for the entire duration of the assessment; leaving or minimizing full-screen is treated as a violation and is monitored continuously."
                    />
                    <ExamRule
                      icon={AlertTriangle}
                      title="Violation Monitoring"
                      description="Any attempt to exit full-screen will be flagged immediately; repeated violations may trigger automatic submission without prior warning."
                    />
                    <ExamRule
                      icon={Clock}
                      title="Technical Issues Protocol"
                      description="If a technical issue occurs, re-enter full-screen as soon as possible and contact the examiners with the candidate ID, timestamp, and a brief description of the issue."
                    />
                  </div>
                </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}

type FeatureCardProps = {
  icon: any;
  title: string;
  description: string;
  bgColor?: string;
};

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description, bgColor }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center shadow-sm mb-4 transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
type ExamRuleProps = {
  icon: any;
  title: string;
  description: string;
};

const ExamRule: FC<ExamRuleProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-400/10 rounded-lg border border-amber-200 dark:border-amber-700">
      <div className="w-8 h-8 bg-red-100 dark:bg-amber-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
      </div>
      <div>
        <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
          {title}
        </h4>
        <p className="text-sm text-gray-800 dark:text-gray-100 leading-relaxed">
          {description}
        </p>
      </div>
    </div>

  );
};

const EnhancedLoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-6 mt-6 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <div className="w-8 h-8 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-1/2"></div>
      </div>
      <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      <span className="sr-only">Loading problems...</span>
    </div>
  );
};