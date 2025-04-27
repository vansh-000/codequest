import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeft, Award, CheckCircle, Loader2, GraduationCap, Book, AlertTriangle, Code, Trash2, Edit, Save, X } from "lucide-react";
import Link from "next/link";

interface Submission {
  _id: string;
  code: string;
  problem: Problem;
  score: number;
  status: string;
  language: string;
  createdAt: string;
  submittedAt: string;
  updatedAt: string;
}

interface Problem {
  title: string,
  _id: string,
}

interface StudentDetail {
  name: string;
  totalScore: number;
  submissions: Submission[];
}

export default function StudentDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [problemTitles, setProblemTitles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [editingScore, setEditingScore] = useState<{ id: string; newScore: number } | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchStudentDetails();
  }, [id]);

  const fetchStudentDetails = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/user/${id}/problem-scores`);
      if (!res.ok) throw new Error("Failed to fetch student data");
      const { username, submissions } = await res.json();
      const totalScore = submissions.reduce((sum: number, sub: Submission) => sum + sub.score, 0);

      // // Generate placeholder problem titles (in a real app, you'd fetch these)
      // const mockTitles: Record<string, string> = {};
      // submissions.forEach((sub: Submission, index: number) => {
      //   if (!mockTitles[sub.problem]) {
      //     // This is just for mock - real app would fetch actual problem titles
      //     if (sub.problem === "680e3a82981717af1fe0cdb6") {
      //       mockTitles[sub.problem] = "Activity Selection";
      //     } else if (sub.problem === "680e3bf4981717af1fe0cdd3") {
      //       mockTitles[sub.problem] = "Two Sum";
      //     } else {
      //       mockTitles[sub.problem] = `Problem ${index + 1}`;
      //     }
      //   }
      // });

      // setProblemTitles(mockTitles);

      setStudent({
        name: username,
        totalScore,
        submissions: submissions
      });
    } catch (err) {
      console.error("Failed to fetch student detail:", err);
      setError("Unable to load student data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestionExpansion = (submissionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  };

  const handleScoreEdit = (submissionId: string, currentScore: number) => {
    setEditingScore({ id: submissionId, newScore: currentScore });
  };

  const saveScoreEdit = async () => {
    if (!editingScore) return;

    setActionLoading(editingScore.id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/${editingScore.id}/score`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: editingScore.newScore }),
      });

      if (!res.ok) throw new Error("Failed to update score");

      // Update local state
      if (student) {
        const updatedSubmissions = student.submissions.map(s =>
          s._id === editingScore.id ? { ...s, score: editingScore.newScore } : s
        );

        const newTotalScore = updatedSubmissions.reduce((sum, s) => sum + s.score, 0);

        setStudent({
          ...student,
          submissions: updatedSubmissions,
          totalScore: newTotalScore
        });
      }

      setActionFeedback({ type: 'success', message: 'Score updated successfully' });
      setTimeout(() => setActionFeedback(null), 3000);
    } catch (err) {
      console.error("Failed to update score:", err);
      setActionFeedback({ type: 'error', message: 'Failed to update score' });
      setTimeout(() => setActionFeedback(null), 3000);
    } finally {
      setActionLoading(null);
      setEditingScore(null);
    }
  };

  const cancelScoreEdit = () => {
    setEditingScore(null);
  };

  const handleDelete = async (submissionId: string) => {
    if (!confirm("Are you sure you want to delete this submission? This action cannot be undone.")) {
      return;
    }

    setActionLoading(submissionId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/${submissionId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error("Failed to delete submission");

      // Update local state
      if (student) {
        const updatedSubmissions = student.submissions.filter(s => s._id !== submissionId);
        const newTotalScore = updatedSubmissions.reduce((sum, s) => sum + s.score, 0);

        setStudent({
          ...student,
          submissions: updatedSubmissions,
          totalScore: newTotalScore
        });
      }

      setActionFeedback({ type: 'success', message: 'Submission deleted successfully' });
      setTimeout(() => setActionFeedback(null), 3000);
    } catch (err) {
      console.error("Failed to delete submission:", err);
      setActionFeedback({ type: 'error', message: 'Failed to delete submission' });
      setTimeout(() => setActionFeedback(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const getScoreColor = (score: number, maxScore = 10) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBackgroundColor = (score: number, maxScore = 10) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "bg-green-100 dark:bg-green-900/30";
    if (percentage >= 50) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Wrong Answer":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Time Limit Exceeded":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
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
            <button
              onClick={() => router.push("/admin/results")}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  console.log("Student Data:", student);
  const passedQuestions = student.submissions.filter(s => s.status === "Accepted").length;
  const averageMark = student.submissions.length > 0
    ? student.submissions.reduce((sum, s) => sum + s.score, 0) / student.submissions.length
    : 0;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin/results")}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </button>
        </div>

        {actionFeedback && (
          <div className={`mb-4 p-4 rounded-md ${actionFeedback.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
            {actionFeedback.message}
          </div>
        )}

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
                  {student.submissions.length}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Submissions
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
                  Accepted
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
                  Submissions and Scores
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {student.submissions.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No submissions available</p>
                  </div>
                ) : (
                  student.submissions.map((submission, index) => (
                    <div
                      key={submission._id || index}
                      className={`${index % 2 === 1 ? "bg-gray-50 dark:bg-gray-700/20" : ""} hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors`}
                    >
                      <div className="p-4">
                        <div className="flex flex-wrap justify-between items-center">
                          <div
                            className="flex items-center space-x-4 cursor-pointer flex-1"
                            onClick={() => toggleQuestionExpansion(submission._id || index.toString())}
                          >
                            <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                              <span className="text-indigo-600 dark:text-indigo-400 font-medium">{index + 1}</span>
                            </div>
                            <div>
                              <h3 className="text-gray-800 dark:text-gray-200 font-medium">
                                {submission.problem.title}
                              </h3>
                              <div className="flex mt-1 space-x-2">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeColor(submission.status)}`}>
                                  {submission.status}
                                </span>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                  {submission.language}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {editingScore && editingScore.id === submission._id ? (
                              <>
                                <input
                                  type="number"
                                  min="0"
                                  value={editingScore.newScore}
                                  onChange={(e) => setEditingScore({
                                    ...editingScore,
                                    newScore: parseInt(e.target.value)
                                  })}
                                  className="w-16 px-2 py-1 text-sm border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <button
                                  onClick={saveScoreEdit}
                                  disabled={actionLoading === submission._id}
                                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 disabled:opacity-50"
                                >
                                  {actionLoading === submission._id ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                  ) : (
                                    <Save className="h-5 w-5" />
                                  )}
                                </button>
                                <button
                                  onClick={cancelScoreEdit}
                                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </>
                            ) : (
                              <>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getScoreBackgroundColor(submission.score)} ${getScoreColor(submission.score)}`}>
                                  {submission.score} pts
                                </span>
                                <button
                                  onClick={() => handleScoreEdit(submission._id, submission.score)}
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(submission._id)}
                                  disabled={actionLoading === submission._id}
                                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 disabled:opacity-50"
                                >
                                  {actionLoading === submission._id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                                  onClick={() => toggleQuestionExpansion(submission._id || index.toString())}
                                >
                                  <Code className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {expandedQuestions.has(submission._id || index.toString()) && (
                          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Submitted Code
                            </h4>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto font-mono text-sm">
                              <pre>{submission.code || "No code submission available"}</pre>
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