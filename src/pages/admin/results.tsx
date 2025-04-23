import { useEffect, useState } from "react";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";

interface Student {
  _id: string;
  name: string;
  totalScore: number;
}

export default function Results() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/user/scores`);
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch students");
        const { data }: { data: Student[] } = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-dark-green-s";
    if (score >= 50) return "text-dark-yellow";
    return "text-dark-pink";
  };

  if (loading) {
    return <p className="text-white">Loading students...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">All Student Marks</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-dark-layer-2 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Status</span>
              </th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student._id}
                className={`${index % 2 === 1 ? "bg-dark-layer-1" : ""} hover:bg-gray-800 transition`}
              >
                <td className="px-6 py-4">
                  <BsCheckCircle className="text-dark-green-s" aria-hidden="true" />
                </td>
                <td className="px-6 py-4 font-medium">
                  <Link
                    href={`/student/${student._id}`}
                    className="hover:text-blue-500 underline"
                  >
                    {student.name}
                  </Link>
                </td>
                <td className={`px-6 py-4 font-semibold ${getScoreColor(student.totalScore)}`}>
                  {student.totalScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
