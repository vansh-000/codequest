import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeft, Award, CheckCircle, Loader2, GraduationCap, Book, AlertTriangle, Code } from "lucide-react";
import Link from "next/link";

interface QuestionResult {
  questionTitle: string;
  marks: number;
  submittedCode: string;
  questionId: string;
}

interface StudentDetail {
  name: string;
  totalScore: number;
  questionResults: QuestionResult[];
}

export default function StudentDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!id) return;
    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/user/${id}/problem-scores`);
        if (!res.ok) throw new Error("Failed to fetch student data");
        const data = await res.json();
        console.log(data)
        setStudent(data);
      } catch (err) {
        console.error("Failed to fetch student detail:", err);
        setError("Unable to load student data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  const toggleQuestionExpansion = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getScoreColor = (score: number, maxScore = 100) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBackgroundColor = (score: number, maxScore = 100) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "bg-green-100 dark:bg-green-900/30";
    if (percentage >= 50) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
            <span className="ml-3 text-gray-700 dark:text-gray-300 text-lg">Loading student data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex flex-col items-center justify-center h-64">
            <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full mb-4">
              <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Student Not Found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
              {error || "We couldn't find the student you're looking for."}
            </p>
            <Link
              href="/results"
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Link>
          </div>
        </div>
      </div>
    );
  }

  console.log('Student::',student)
  const passedQuestions = student.questionResults.filter(q => q.marks > 0).length;
  const averageMark = student.questionResults.length > 0
    ? student.questionResults.reduce((sum, q) => sum + q.marks, 0) / student.questionResults.length
    : 0;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="mb-6">
          <Link
            href="/results"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden mb-8">
          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {student.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Student Performance Details
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className={`flex items-center justify-center rounded-full px-4 py-2 ${getScoreBackgroundColor(student.totalScore)}`}>
                  <Award className={`w-5 h-5 mr-2 ${getScoreColor(student.totalScore)}`} />
                  <span className={`text-xl font-bold ${getScoreColor(student.totalScore)}`}>
                    {student.totalScore} Points
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 shadow-sm rounded-lg p-5 flex flex-col items-center w-40">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-3">
                  <Book className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {student.questionResults.length}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Questions
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 shadow-sm rounded-lg p-5 flex flex-col items-center w-40">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {passedQuestions}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Correct
                </span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 shadow-sm rounded-lg p-5 flex flex-col items-center w-40">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mb-3">
                  <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {averageMark.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Avg Score
                </span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Question Performance and Submissions
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {student.questionResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No question results available</p>
                  </div>
                ) : (
                  student.questionResults.map((q, index) => (
                    <div 
                      key={q.questionId || index}
                      className={`${index % 2 === 1 ? "bg-gray-50 dark:bg-gray-700/20" : ""} hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors`}
                    >
                      <div className="p-4">
                        <div className="flex flex-wrap justify-between items-center cursor-pointer" 
                             onClick={() => toggleQuestionExpansion(q.questionId || index.toString())}>
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                              <span className="text-indigo-600 dark:text-indigo-400 font-medium">{index + 1}</span>
                            </div>
                            <h3 className="text-gray-800 dark:text-gray-200 font-medium">{q.questionTitle}</h3>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getScoreBackgroundColor(q.marks)} ${getScoreColor(q.marks)}`}>
                              {q.marks} pts
                            </span>
                            <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                              <Code className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        {expandedQuestions.has(q.questionId || index.toString()) && (
                          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Submitted Code
                            </h4>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto font-mono text-sm">
                              <pre>{q.submittedCode || "No code submission available"}</pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}