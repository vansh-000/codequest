// pages/student/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface QuestionResult {
  questionTitle: string;
  marks: number;
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

  useEffect(() => {
    if (!id) return;
    const fetchStudentDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/user/${id}/problem-scores`);
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error("Failed to fetch student detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  if (loading) return <p className="text-white p-6">Loading student data...</p>;
  if (!student) return <p className="text-red-500 p-6">Student not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">{student.name}</h1>
      <p className="mb-6 text-lg font-semibold">
        Total Score:{" "}
        <span className="text-green-400">{student.totalScore}</span>
      </p>

      <div className="overflow-x-auto border border-gray-700 rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-dark-layer-2">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Question</th>
              <th className="px-6 py-3">Marks</th>
            </tr>
          </thead>
          <tbody>
            {student.questionResults.map((q, index) => (
              <tr
                key={index}
                className={`${index % 2 === 1 ? "bg-dark-layer-1" : ""}`}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{q.questionTitle}</td>
                <td className="px-6 py-4 text-green-400 font-semibold">
                  {q.marks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
