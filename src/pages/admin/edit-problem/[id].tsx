"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import Logout from "@/components/UI/LogoutBtn";

interface TestCase {
  input: string[];
  expectedOutput: string;
}

interface ProblemFormData {
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: string[];
  constraints: string[];
  starterCode: string;
  likes?: number;
  dislikes?: number;
  order: number;
  videoId: string;
}

const EditProblemPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProblemFormData>();

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [constraints, setConstraints] = useState<string[]>([]);
  const [newConstraint, setNewConstraint] = useState<string>("");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [examples, setExamples] = useState<string[]>([]);
  const [newExample, setNewExample] = useState<string>("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          if (parsedUser.role === "user") {
            router.push("/");
          } else if (id) {
            fetchProblemDetails(id as string);
          }
        } else {
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error parsing storedUser:", error);
        localStorage.removeItem("user");
        router.push("/admin");
      }
    }
  }, [router, id]);

  const fetchProblemDetails = async (problemId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/problems/get-problem/${problemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch problem details");
      }

      const data = await response.json();
      console.log(data)
      const problem = data.message;
      if (!problem) {
        throw new Error("Problem not found");
      }

      // Set form values
      setValue("title", problem.title);
      setValue("category", problem.category);
      setValue("difficulty", problem.difficulty);
      setValue("description", problem.description);
      setValue("starterCode", problem.starterCode);
      setValue("order", problem.order);
      setValue("videoId", problem.videoId);
      setValue("likes", problem.likes || 0);
      setValue("dislikes", problem.dislikes || 0);

      // Set state values
      setConstraints(problem.constraints || []);
      setExamples(problem.examples || []);
      setTestCases(problem.testCases || []);

    } catch (error) {
      console.error("Error fetching problem details:", error);
      setMessage("❌ Error loading problem details");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<ProblemFormData> = async (data) => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/problems/update-problem/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            ...data,
            constraints,
            examples,
            testCases: testCases.map((tc) => ({
              input: tc.input.map((str) => str.trim()),
              expectedOutput: tc.expectedOutput.trim(),
            })),
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Problem updated successfully!");
      } else {
        setMessage(result.error || "Error updating problem");
      }
    } catch (error) {
      console.error("Error updating problem:", error);
      setMessage("❌ Error updating problem!");
    }

    setSaving(false);
  };

  const addConstraint = () => {
    if (newConstraint.trim()) {
      setConstraints((prevConstraints) => [...prevConstraints, newConstraint.trim()]);
      setNewConstraint("");
    }
  };

  const removeConstraint = (index: number) => {
    setConstraints((prev) => prev.filter((_, i) => i !== index));
  };

  const addExample = () => {
    if (newExample.trim()) {
      setExamples((prevExamples) => [...prevExamples, newExample.trim()]);
      setNewExample("");
    }
  };

  const removeExample = (index: number) => {
    setExamples((prev) => prev.filter((_, i) => i !== index));
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: [], expectedOutput: "" }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTestCase = (
    index: number,
    field: keyof TestCase,
    value: string | string[]
  ) => {
    setTestCases((prevTestCases) =>
      prevTestCases.map((tc, i) =>
        i === index
          ? {
            ...tc,
            [field]:
              field === "input"
                ? Array.isArray(value)
                  ? value.map((str) => str.trim())
                  : value.split(",").map((str) => str.trim())
                : value,
          }
          : tc
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">Loading problem details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-4xl mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Edit Problem</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Back to Problems
            </button>
            <Logout />
          </div>
        </div>

        {message && (
          <p className="py-2 px-4 text-center text-sm font-semibold rounded-lg bg-gray-700 mb-4 text-blue-400">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
              className="p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              {...register("category", { required: "Category is required" })}
              placeholder="Category"
              className="p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              {...register("difficulty", { required: "Select difficulty" })}
              className="p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input
              {...register("order", {
                required: "Order is required",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Problem Order"
              className="p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Problem Description"
            className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
          />

          <input
            {...register("videoId", { required: "Video ID is required" })}
            placeholder="Video ID"
            className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg"
          />

          <h3 className="text-lg font-semibold">Starter Code</h3>
          <textarea
            {...register("starterCode", {
              required: "Starter code is required",
            })}
            placeholder="Starter Code"
            className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg"
            rows={4}
          />

          <h3 className="text-lg font-semibold">Constraints</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newConstraint}
              onChange={(e) => setNewConstraint(e.target.value)}
              placeholder="Add constraint"
              className="flex-grow p-2 border border-gray-700 bg-gray-900 rounded-lg"
            />
            <button
              type="button"
              onClick={addConstraint}
              className="px-3 py-2 bg-green-600 rounded-lg hover:bg-green-700"
            >
              +
            </button>
          </div>
          <ul className="mt-2 space-y-2">
            {constraints.map((constraint, index) => (
              <li key={index} className="flex justify-between items-center text-sm bg-gray-700 p-2 rounded-lg">
                <span>{constraint}</span>
                <button
                  type="button"
                  onClick={() => removeConstraint(index)}
                  className="px-2 py-1 bg-red-600 rounded-md hover:bg-red-700 text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold">Examples</h3>
          <div className="flex space-x-2">
            <textarea
              value={newExample}
              onChange={(e) => setNewExample(e.target.value)}
              placeholder="Add example"
              className="flex-grow p-2 border border-gray-700 bg-gray-900 rounded-lg resize-none h-20"
            />
            <button
              type="button"
              onClick={addExample}
              className="px-3 py-2 bg-green-600 rounded-lg hover:bg-green-700"
            >
              +
            </button>
          </div>
          <ul className="mt-2 space-y-2">
            {examples.map((example, index) => (
              <li key={index} className="flex justify-between items-center text-sm bg-gray-700 p-2 rounded-lg">
                <span className="whitespace-pre-wrap">{example}</span>
                <button
                  type="button"
                  onClick={() => removeExample(index)}
                  className="px-2 py-1 bg-red-600 rounded-md hover:bg-red-700 text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>


          <h3 className="text-lg font-semibold">Test Cases</h3>
          {testCases.map((tc, index) => (
            <div key={index} className="space-y-2 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Test Case #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeTestCase(index)}
                  className="px-2 py-1 bg-red-600 rounded-md hover:bg-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                value={tc.input.join(", ")}
                onChange={(e) => updateTestCase(index, "input", e.target.value)}
                placeholder="Test case input (comma-separated)"
                className="w-full p-2 border border-gray-700 bg-gray-900 rounded-lg"
              />
              <input
                type="text"
                value={tc.expectedOutput}
                onChange={(e) =>
                  updateTestCase(index, "expectedOutput", e.target.value)
                }
                placeholder="Expected output"
                className="w-full p-2 border border-gray-700 bg-gray-900 rounded-lg"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTestCase}
            className="mt-2 w-full py-2 bg-green-600 rounded-lg hover:bg-green-700"
          >
            Add Test Case
          </button>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
              {saving ? "Saving Changes..." : "Update Problem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProblemPage;