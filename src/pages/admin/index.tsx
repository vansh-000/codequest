"use client";

import Logout from "@/components/UI/LogoutBtn";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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
  testCases: TestCase[];
  starterCode: string;
  likes?: number;
  dislikes?: number;
  order: number;
  videoId: string;
}

const AdminPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProblemFormData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [constraints, setConstraints] = useState<string[]>([]);
  const [newConstraint, setNewConstraint] = useState<string>("");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [examples, setExamples] = useState<string[]>([]);
  const [newExample, setNewExample] = useState<string>("");

  const onSubmit: SubmitHandler<ProblemFormData> = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/problems/create-problems`,
        {
          method: "POST",
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
            likes: data.likes || 0,
            dislikes: data.dislikes || 0,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Problem added successfully!");
        reset();
        setConstraints([]);
        setExamples([]);
        setTestCases([]);
      } else {
        setMessage(result.error || "Error adding problem");
      }
    } catch (error) {
      setMessage("❌ Error!!");
    }

    setLoading(false);
  };
  const addConstraint = () => {
    if (newConstraint.trim()) {
      setConstraints((prevConstraints) => [
        ...prevConstraints,
        newConstraint.trim(),
      ]);
      setNewConstraint("");
    }
  };

  const addExample = () => {
    if (newExample.trim()) {
      setExamples((prevExamples) => [...prevExamples, newExample.trim()]);
      setNewExample("");
    }
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: [], expectedOutput: "" }]);
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
            ...tc, [field]: field === "input" ? Array.isArray(value) ? value.map((str) => str.trim()) : [value.trim()] : value,
          }
          : tc
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-gray-800 text-white p-6 rounded-xl shadow-lg">
        <div className="absolute top-4 right-4">
          <Logout />
        </div>
        <h2 className="text-3xl font-bold text-center mb-4">Admin Panel</h2>
        {message && (
          <p className="py-2 px-4 text-center text-sm font-semibold rounded-lg bg-gray-700 text-blue-400">
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
              className="px-3 py-2 bg-green-600 rounded-lg"
            >
              +
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {constraints.map((constraint, index) => (
              <li key={index} className="text-sm text-gray-400">
                • {constraint}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">Examples</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newExample}
              onChange={(e) => setNewExample(e.target.value)}
              placeholder="Add example"
              className="flex-grow p-2 border border-gray-700 bg-gray-900 rounded-lg"
            />
            <button
              type="button"
              onClick={addExample}
              className="px-3 py-2 bg-green-600 rounded-lg"
            >
              +
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {examples.map((example, index) => (
              <li key={index} className="text-sm text-gray-400">
                • {example}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">Test Cases</h3>
          {testCases.map((tc, index) => (
            <div key={index} className="space-y-2">
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
            className="mt-2 w-full py-2 bg-green-600 rounded-lg"
          >
            Add Test Case
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-blue-600 rounded-lg"
          >
            {loading ? "Submitting..." : "Add Problem"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
