"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import Logout from "@/components/UI/LogoutBtn";
import { AlertTriangle, ArrowLeft, Code, HelpCircle, Info, Plus, Save, Trash2, Video } from "lucide-react";

interface TestCase {
  input: string;
  output: string;
}

interface CodeBlock {
  language: string;
  starterCode: string;
  helperCode: string;
}

interface ProblemFormData {
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: string[];
  constraints: string[];
  testCases: TestCase[];
  codes: CodeBlock[];
  likes?: number;
  dislikes?: number;
  order: number;
}

const AddProblemPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProblemFormData>();

  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [constraints, setConstraints] = useState<string[]>([]);
  const [newConstraint, setNewConstraint] = useState<string>("");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [examples, setExamples] = useState<string[]>([]);
  const [newExample, setNewExample] = useState<string>("");
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([
    { language: "javascript", starterCode: "", helperCode: "" }
  ]);
  const [activeTab, setActiveTab] = useState<string>("basic");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          if (parsedUser.role === "user") {
            router.push("/");
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
  }, [router]);

  const onSubmit: SubmitHandler<ProblemFormData> = async (data) => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/problems/create-problems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            ...data,
            constraints,
            examples,
            testCases: testCases.map((tc) => ({
              input: tc.input.trim(),
              output: tc.output.trim(),
            })),
            codes: codeBlocks,
            likes: data.likes || 0,
            dislikes: data.dislikes || 0,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Problem added successfully!" });
        window.scrollTo({ top: 0, behavior: "smooth" });
        reset();
        setConstraints([]);
        setExamples([]);
        setTestCases([]);
        setCodeBlocks([{ language: "javascript", starterCode: "", helperCode: "" }]);
      } else {
        setMessage({ type: "error", text: result.error || "Error adding problem" });
      }
    } catch (error) {
      console.error("Error adding problem:", error);
      setMessage({ type: "error", text: "Error adding problem!" });
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
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const removeTestCase = (index: number) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTestCase = (
    index: number,
    field: keyof TestCase,
    value: string
  ) => {
    setTestCases((prev) =>
      prev.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc))
    );
  };

  const addCodeBlock = () => {
    setCodeBlocks([...codeBlocks, { language: "", starterCode: "", helperCode: "" }]);
  };

  const removeCodeBlock = (index: number) => {
    setCodeBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCodeBlock = (
    index: number,
    field: keyof CodeBlock,
    value: string
  ) => {
    setCodeBlocks((prev) =>
      prev.map((code, i) => (i === index ? { ...code, [field]: value } : code))
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500 border-green-500";
      case "Medium":
        return "text-yellow-500 border-yellow-500";
      case "Hard":
        return "text-red-500 border-red-500";
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  const languageOptions = [
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Problem List</span>
          </button>
        </div>
        <Logout />
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Page Title */}
          <div className="bg-indigo-900/30 border-b border-gray-700 p-6">
            <h2 className="text-3xl font-bold text-white">Add New Problem</h2>
            <p className="text-gray-400 mt-1">Create a new coding challenge for users</p>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`p-4 ${message.type === "success"
                ? "bg-green-500/20 border-l-4 border-green-500"
                : "bg-red-500/20 border-l-4 border-red-500"
                } text-white mx-6 mt-6 rounded-lg flex items-center`}
            >
              {message.type === "success" ? (
                <Info className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 mr-2 text-red-400 flex-shrink-0" />
              )}
              <p>{message.text}</p>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700 mt-6 px-6">
            <button
              type="button"
              className={`py-3 px-6 ${activeTab === "basic"
                ? "border-b-2 border-indigo-500 font-semibold text-white"
                : "text-gray-400"
                }`}
              onClick={() => setActiveTab("basic")}
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>Basic Info</span>
              </div>
            </button>
            <button
              type="button"
              className={`py-3 px-6 ${activeTab === "content"
                ? "border-b-2 border-indigo-500 font-semibold text-white"
                : "text-gray-400"
                }`}
              onClick={() => setActiveTab("content")}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Problem Content</span>
              </div>
            </button>
            <button
              type="button"
              className={`py-3 px-6 ${activeTab === "code"
                ? "border-b-2 border-indigo-500 font-semibold text-white"
                : "text-gray-400"
                }`}
              onClick={() => setActiveTab("code")}
            >
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Code</span>
              </div>
            </button>
            <button
              type="button"
              className={`py-3 px-6 ${activeTab === "TestCases"
                ? "border-b-2 border-indigo-500 font-semibold text-white"
                : "text-gray-400"
                }`}
              onClick={() => setActiveTab("TestCases")}
            >
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>TestCases</span>
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Basic Info Tab */}
            <div className={activeTab === "basic" ? "block" : "hidden"}>
              <div className="bg-gray-750 rounded-lg p-6 space-y-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-indigo-400" />
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">Title</label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      placeholder="Problem Title"
                      className="w-full p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">Category</label>
                    <input
                      {...register("category", { required: "Category is required" })}
                      placeholder="e.g. Array, String, Graph"
                      className="w-full p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
                    />
                    {errors.category && <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">Difficulty</label>
                    <select
                      {...register("difficulty", { required: "Select difficulty" })}
                      className="w-full p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
                    >
                      <option value="">Select Difficulty</option>
                      <option value="Easy" className="text-green-500">Easy</option>
                      <option value="Medium" className="text-yellow-500">Medium</option>
                      <option value="Hard" className="text-red-500">Hard</option>
                    </select>
                    {errors.difficulty && <p className="mt-1 text-sm text-red-400">{errors.difficulty.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-400">Problem Order</label>
                    <input
                      {...register("order", {
                        required: "Order is required",
                        valueAsNumber: true,
                      })}
                      type="number"
                      placeholder="Numerical order for display"
                      className="w-full p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
                    />
                    {errors.order && <p className="mt-1 text-sm text-red-400">{errors.order.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Content Tab */}
            <div className={activeTab === "content" ? "block" : "hidden"}>
              <div className="bg-gray-750 rounded-lg p-6 space-y-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-indigo-400" />
                  Problem Description
                </h3>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">Description</label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="Detailed problem description"
                    className="w-full p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white font-mono"
                    rows={6}
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>}
                </div>
              </div>

              <div className="bg-gray-750 rounded-lg p-6 space-y-6 border border-gray-700 mt-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-indigo-400" />
                  Constraints & Examples
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-400">Constraints</label>
                      <span className="text-xs text-gray-500">{constraints.length} constraints added</span>
                    </div>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newConstraint}
                        onChange={(e) => setNewConstraint(e.target.value)}
                        placeholder="Add a constraint"
                        className="flex-grow p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addConstraint();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addConstraint}
                        className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                    {constraints.length > 0 ? (
                      <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {constraints.map((constraint, index) => (
                          <li key={index} className="flex justify-between items-center text-sm bg-gray-700/50 p-3 rounded-lg">
                            <span className="text-gray-200">{constraint}</span>
                            <button
                              type="button"
                              onClick={() => removeConstraint(index)}
                              className="ml-2 p-1 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No constraints added yet. Add constraints to specify problem limitations.</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-400">Examples</label>
                      <span className="text-xs text-gray-500">{examples.length} examples added</span>
                    </div>
                    <div className="flex space-x-2 mb-3">
                      <textarea
                        value={newExample}
                        onChange={(e) => setNewExample(e.target.value)}
                        placeholder="Add an example with input and output"
                        className="flex-grow p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white font-mono resize-none"
                        rows={3}
                      />
                      <button
                        type="button"
                        onClick={addExample}
                        className="px-4 self-start bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                    {examples.length > 0 ? (
                      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {examples.map((example, index) => (
                          <li key={index} className="flex justify-between items-start text-sm bg-gray-700/50 p-3 rounded-lg">
                            <pre className="whitespace-pre-wrap text-gray-200 font-mono text-xs">{example}</pre>
                            <button
                              type="button"
                              onClick={() => removeExample(index)}
                              className="ml-2 p-1 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No examples added yet. Examples help users understand the problem.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Code Tab */}
            <div className={activeTab === "code" ? "block" : "hidden"}>
              <div className="bg-gray-750 rounded-lg p-6 space-y-6 border border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Code className="h-5 w-5 text-indigo-400" />
                    Solution Code
                  </h3>
                  <button
                    type="button"
                    onClick={addCodeBlock}
                    className="px-3 py-1 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Language</span>
                  </button>
                </div>

                <div className="space-y-8">
                  {codeBlocks.map((codeBlock, index) => (
                    <div key={index} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Code className="h-5 w-5 text-indigo-300" />
                          <span className="font-medium text-indigo-300">Language #{index + 1}</span>
                        </div>
                        {codeBlocks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCodeBlock(index)}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-400">Language</label>
                          <select
                            value={codeBlock.language}
                            onChange={(e) => updateCodeBlock(index, "language", e.target.value)}
                            className="w-full p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white"
                          >
                            <option value="">Select Language</option>
                            {languageOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-400">Starter Code</label>
                          <p className="text-xs text-gray-500">Initial code provided to the user</p>
                          <textarea
                            value={codeBlock.starterCode}
                            onChange={(e) => updateCodeBlock(index, "starterCode", e.target.value)}
                            placeholder={`function solution(params) {\n  // Your code here\n}`}
                            className="w-full p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white font-mono"
                            rows={6}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-400">Helper Code</label>
                          <p className="text-xs text-gray-500">Code that runs in the background (not visible to users)</p>
                          <textarea
                            value={codeBlock.helperCode}
                            onChange={(e) => updateCodeBlock(index, "helperCode", e.target.value)}
                            placeholder={`function runTests() {\n  // Test runner code\n}`}
                            className="w-full p-3 border border-gray-700 bg-gray-700/50 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white font-mono"
                            rows={6}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Test Cases Tab */}
            <div className={activeTab === "TestCases" ? "block" : "hidden"}>
              <div className="bg-gray-750 rounded-lg p-6 space-y-6 border border-gray-700 mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-indigo-400" />
                    Test Cases
                  </h3>
                  <button
                    type="button"
                    onClick={addTestCase}
                    className="px-3 py-1 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Test Case</span>
                  </button>
                </div>

                {testCases.length > 0 ? (
                  <div className="space-y-4">
                    {testCases.map((tc, index) => (
                      <div key={index} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-sm text-indigo-300 flex items-center gap-1">
                            <HelpCircle className="h-4 w-4" />
                            Test Case #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeTestCase(index)}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Input</label>
                            <input
                              type="text"
                              value={tc.input}
                              onChange={(e) => updateTestCase(index, "input", e.target.value)}
                              placeholder="Test case input (comma-separated)"
                              className="w-full p-2 border border-gray-600 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white font-mono text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Expected Output</label>
                            <input
                              type="text"
                              value={tc.output}
                              onChange={(e) => updateTestCase(index, "output", e.target.value)}
                              placeholder="Expected output"
                              className="w-full p-2 border border-gray-600 bg-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white font-mono text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-700/30 border border-gray-700 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-400">No test cases added yet. Add test cases to validate user solutions.</p>
                    <button
                      type="button"
                      onClick={addTestCase}
                      className="mt-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-1 text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add First Test Case</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setConstraints([]);
                  setExamples([]);
                  setTestCases([]);
                  setCodeBlocks([{ language: "javascript", starterCode: "", helperCode: "" }]);
                  setMessage(null);
                }}
                className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 className="h-5 w-5" />
                Clear Form
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(prevTab => {
                      if (prevTab === "basic") return "content";
                      if (prevTab === "content") return "code";
                      if (prevTab === "code") return "TestCases";
                      return "basic";
                    });
                  }}
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  Next Tab
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="h-4 w-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-1" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Create Problem
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProblemPage;