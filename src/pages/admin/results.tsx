import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckCircle, Loader2, ArrowLeft, Award, ArrowUpDown, UserX, RefreshCw, Download } from "lucide-react";

interface Student {
  _id: string;
  username: string;
  totalScore: number;
}

export default function Results() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [exporting, setExporting] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/scores`);
      if (!res.ok) throw new Error("Failed to fetch students");
      const { data }: { data: Student[] } = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Unable to load student data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
    if (score >= 50) return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400";
    return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
  };

  const sortStudents = () => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);

    const sorted = [...students].sort((a, b) => {
      return direction === "asc"
        ? a.totalScore - b.totalScore
        : b.totalScore - a.totalScore;
    });

    setStudents(sorted);
  };

  const exportToCSV = () => {
    setExporting(true);
    try {
      const headers = ["ID", "Username", "Score"];
      const csvContent = [
        headers.join(","),
        ...students.map(student =>
          [student._id, student.username, student.totalScore].join(",")
        )
      ].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `student_results_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error exporting data:", err);
      alert("Failed to export data. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const exportToWord = () => {
    setExporting(true);
    try {
      let tableContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
        <head>
          <meta charset="utf-8">
          <title>Student Results</title>
        </head>
        <body>
          <h1>Student Results Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <h2>Summary</h2>
          <p>Total Students: ${students.length}</p>
          <p>High Scores (80+): ${students.filter(s => s.totalScore >= 80).length}</p>
          <p>Average Score: ${Math.round(students.reduce((acc, student) => acc + student.totalScore, 0) / (students.length || 1))}</p>
          <h2>Individual Results</h2>
          <table border="1" cellspacing="0" cellpadding="5">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
      `;

      students.forEach(student => {
        tableContent += `
          <tr>
            <td>${student._id}</td>
            <td>${student.username}</td>
            <td>${student.totalScore}</td>
          </tr>
        `;
      });

      tableContent += `
          </table>
        </body>
        </html>
      `;

      const blob = new Blob([tableContent], { type: "application/msword;charset=utf-8" });


      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", `student_results_${new Date().toISOString().split('T')[0]}.doc`);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error exporting data:", err);
      alert("Failed to export data. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              STUDENT RESULTS
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Performance overview of all students in the coding examination
          </p>
        </div>
        <div className="flex justify-between mb-6">
          <button
            onClick={() => router.push("/admin")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          {students.length > 0 &&
            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                disabled={exporting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Download className="h-5 w-5" />
                <span>{exporting ? "Exporting..." : "Export CSV"}</span>
              </button>
              <button
                onClick={exportToWord}
                disabled={exporting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Download className="h-5 w-5" />
                <span>{exporting ? "Exporting..." : "Export Word"}</span>
              </button>
            </div>
          }
        </div>

        {!loading && students.length > 0 && (
          <div className="flex justify-center gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col items-center w-40">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-3">
                <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {students.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Students
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col items-center w-40">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {students.filter(s => s.totalScore >= 80).length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                High Scores
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex flex-col items-center w-40">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mb-3">
                <Loader2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(students.reduce((acc, student) => acc + student.totalScore, 0) / (students.length || 1))}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Avg Score
              </span>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Student Performance
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Review individual student progress and achievement
            </p>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse p-4">
                {[...Array(5)].map((_, idx) => (
                  <LoadingSkeleton key={idx} />
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full mb-4">
                  <UserX className="h-12 w-12 text-red-500 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Error Loading Data
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
                  {error}
                </p>
                <button
                  onClick={fetchStudents}
                  className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
              </div>
            ) : students.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/20 p-4 rounded-full mb-4">
                  <UserX className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No Student Data Available
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
                  There are currently no student records to display. Students will appear here once they&#39;ve completed their assessments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={fetchStudents}
                    className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                  </button>
                  <Link
                    href="/admin"
                    className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th scope="col" className="px-1 py-3 w-0 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      <button
                        onClick={sortStudents}
                        className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white"
                      >
                        Score
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student._id}
                      className={`border-b dark:border-gray-700 ${index % 2 === 0 ? "" : "bg-gray-50 dark:bg-gray-700/20"
                        } hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors`}
                    >
                      <td className="px-4 py-4 w-10">
                        <CheckCircle className={`w-5 h-5 ${getScoreColor(student.totalScore)}`} />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        <Link
                          href={`/admin/submissions/${student._id}`}
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {student.username}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getBadgeColor(student.totalScore)}`}>
                          {student.totalScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-4 sm:w-20 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};