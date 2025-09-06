import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import axios from "axios";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { AiOutlineFullscreen } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";

type PlaygroundProps = {
  problem: Problem;
  existingSubmission: any | null;
  alreadySubmitted: boolean;
};

type SubmissionStatus = "Accepted" | "Wrong Answer" | "Compilation Error";
type Language = "cpp" | "c" | "python" | "java";

const LANGUAGE_CONFIG: Record<Language, any> = {
  cpp: {
    name: "C++",
    extension: () => cpp(),
    starter: (code: string) => code || "int main() {\n  // Your code here\n  return 0;\n}"
  },
  c: {
    name: "C",
    extension: () => cpp(),
    starter: (code: string) => code || "#include <stdio.h>\n\nint main() {\n  // Your code here\n  return 0;\n}"
  },
  python: {
    name: "Python",
    extension: () => python(),
    starter: (code: string) => code || "# Your Python code here\n"
  },
  java: {
    name: "Java",
    extension: () => typeof java === "function" ? java() : cpp(),
    starter: (code: string) => code || "public class Main {\n  public static void main(String[] args) {\n    // Your code here\n  }\n}"
  }
};


const Playground: React.FC<PlaygroundProps> = ({ problem, existingSubmission, alreadySubmitted }) => {
  const availableLanguages = useMemo(() => {
    if (!problem.codes || !Array.isArray(problem.codes) || problem.codes.length === 0) {
      return ["cpp"] as Language[];
    }
    const languageNameToKey: Record<string, Language> = {};
    Object.entries(LANGUAGE_CONFIG).forEach(([key, config]) => {
      languageNameToKey[config.name.toLowerCase()] = key as Language;
    });
    const availableLangs = problem.codes
      .filter(code => code.language && typeof code.language === 'string')
      .map(code => languageNameToKey[code.language.toLowerCase()])
      .filter((lang): lang is Language => !!lang);
    return availableLangs.length > 0 ? availableLangs : (["cpp"] as Language[]);
  }, [problem]);

  const [language, setLanguage] = useState<Language>(availableLanguages[0]);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus | null>(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(alreadySubmitted);
  const editorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fullscreenSubmitRef = useRef<boolean>(true);
  const isSubmittedRef = useRef<boolean>(isSubmitted);
  useEffect(() => { isSubmittedRef.current = isSubmitted; }, [isSubmitted]);

  const getStarterCode = useCallback((lang: Language): string => {
    if (!problem.codes || !Array.isArray(problem.codes)) {
      return LANGUAGE_CONFIG[lang].starter("");
    }
    const codeObj = problem.codes.find(c =>
      c.language.toLowerCase() === LANGUAGE_CONFIG[lang].name.toLowerCase()
    );
    return codeObj?.starterCode || LANGUAGE_CONFIG[lang].starter("");
  }, [problem.codes]);

  const getHelperCode = useCallback((lang: Language): string => {
    if (!problem.codes || !Array.isArray(problem.codes)) return "";
    const codeObj = problem.codes.find(c =>
      c.language.toLowerCase() === LANGUAGE_CONFIG[lang].name.toLowerCase()
    );
    return codeObj?.helperCode || "";
  }, [problem.codes]);

  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem("draftCode-" + problem._id, code);
    }
  }, [code, isSubmitted, problem._id]);

  useEffect(() => {
    if (!isSubmitted) {
      const saved = localStorage.getItem("draftCode-" + problem._id);
      if (saved) setCode(saved);
    }
  }, [problem._id, isSubmitted]);

  const getUserId = () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) return null;
      const user = JSON.parse(userString);
      return user._id;
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return null;
    }
  };
  const userId = getUserId();

  useEffect(() => {
    setIsSubmitted(alreadySubmitted);
    if (existingSubmission && existingSubmission.code) {
      const submissionLang: Language =
        existingSubmission.language && availableLanguages.includes(existingSubmission.language)
          ? existingSubmission.language
          : availableLanguages;
      setCode(existingSubmission.code);
      setLanguage(submissionLang);
      setSubmissionStatus(existingSubmission.status);
    } else {
      setCode(getStarterCode(language));
      setSubmissionStatus(null);
    }
  }, [
    problem,
    existingSubmission,
    alreadySubmitted,
    availableLanguages,
    language,
    getStarterCode
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playground/run`,
        { code: code + getHelperCode(language), language }
      );
      setOutput(res.data.output.split("\n"));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createSubmission = useCallback(
    async (status: SubmissionStatus, resultScore: number = 0, codeValue?: string) => {
      if (!userId) {
        setError("You must be logged in to submit solutions.");
        return null;
      }
      if (isSubmittedRef.current) {
        return null;
      }
      try {
        const submissionData = {
          code: codeValue ?? code,
          language,
          status,
          score: resultScore
        };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/submissions/user/${userId}/problem/${problem._id}`,
          submissionData
        );
        return response.data;
      } catch (err: any) {
        setError(prev => `${prev ? prev + ". " : ""}Failed to save submission: ${err.response?.data?.message || err.message}`);
        return null;
      }
    },
    [userId, code, language, problem._id]
  );

  const handleSubmit = useCallback(async () => {
    if (isSubmittedRef.current) {
      setError("You have already submitted a solution for this problem.");
      return;
    }
    setLoading(true);
    setError(null);
    setSubmissionStatus(null);
    try {
      const combined = code + getHelperCode(language);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playground/submit`,
        { code: combined, language }
      );

      const apiError = res.data?.error ?? res.data?.errors;
      if (apiError) {
        setError(apiError);
        setOutput([]);
        const saved = await createSubmission("Wrong Answer", 0, code);
        setSubmissionStatus("Wrong Answer");
        if (saved) setIsSubmitted(true);
      } else if (res.data?.output) {
        setOutput(res.data.output.split("\n"));
        const saved = await createSubmission("Accepted", 10, code);
        setSubmissionStatus("Accepted");
        if (saved) setIsSubmitted(true);
      } else {
        setError("Unknown response from judge.");
        const saved = await createSubmission("Wrong Answer", 0, code);
        setSubmissionStatus("Wrong Answer");
        if (saved) setIsSubmitted(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      const saved = await createSubmission("Compilation Error", 0, code);
      setSubmissionStatus("Compilation Error");
      if (saved) setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  }, [code, language, createSubmission, getHelperCode]);
  const handleSubmitRef = useRef(handleSubmit);
  useEffect(() => { handleSubmitRef.current = handleSubmit; }, [handleSubmit]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc" || e.key === "F11") {
        toggleFullscreen();
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        if (!isSubmittedRef.current) handleRun();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fullscreen toggle: do NOT submit here on exit; submit occurs in the fullscreenchange handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && editorRef.current) {
      const node = editorRef.current.parentNode?.parentNode?.parentNode as any;
      if (!node) return;
      if (!isSubmittedRef.current) {
        fullscreenSubmitRef.current = true; // mark submit on exit
      }
      node.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen(); // no direct submit here; event will handle it
    }
  };

  // fullscreenchange listener: always uses refs to avoid stale closures
  useEffect(() => {
    const handleFullscreenChange = async () => {
      const fullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(fullscreen);
      if (!fullscreen && fullscreenSubmitRef.current && !isSubmittedRef.current) {
        fullscreenSubmitRef.current = false;
        await handleSubmitRef.current();
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
    setSubmissionStatus(null);
    setOutput([]);
    setError(null);
    setCode(getStarterCode(lang));
  };

  return (
    <div ref={editorRef} className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden" aria-label="Code Playground">
      <div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
        <div className='flex items-center text-white relative' ref={dropdownRef}>
          {availableLanguages.length > 1 ? (
            <button
              aria-haspopup="listbox"
              aria-expanded={isLanguageDropdownOpen}
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className='flex items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium'
            >
              <div className='flex items-center px-1'>
                <span className='text-xs text-label-2 dark:text-dark-label-2'>{LANGUAGE_CONFIG[language].name}</span>
                <span className='ml-1'>
                  <BiChevronDown className={`transition ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </span>
              </div>
            </button>
          ) : (
            <div className='flex items-center rounded bg-dark-fill-3 text-dark-label-2 px-2 py-1.5 font-medium'>
              <div className='flex items-center px-1'>
                <span className='text-xs text-label-2 dark:text-dark-label-2'>{LANGUAGE_CONFIG[language].name}</span>
              </div>
            </div>
          )}
          {isLanguageDropdownOpen && availableLanguages.length > 1 && (
            <div role="listbox" className='absolute top-full left-0 mt-1 bg-dark-layer-1 rounded-md shadow-lg z-10 border border-dark-fill-3'>
              {availableLanguages.map((langKey) => (
                <div
                  key={langKey}
                  role="option"
                  aria-selected={language === langKey}
                  className={`px-4 py-2 text-sm hover:bg-dark-fill-3 cursor-pointer ${language === langKey ? 'bg-dark-fill-2' : ''}`}
                  onClick={() => handleLanguageChange(langKey)}
                  tabIndex={0}
                >
                  {LANGUAGE_CONFIG[langKey].name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='flex items-center m-2'>
          <button onClick={toggleFullscreen} className='preferenceBtn group' aria-label={isFullscreen ? "Exit Full Screen" : "Full Screen"}>
            <span className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
              <AiOutlineFullscreen />
            </span>
            <span className='preferenceBtn-tooltip'>
              {isFullscreen ? "Exit Full Screen" : "Full Screen"}
            </span>
          </button>
        </div>
      </div>

      <Split className="h-[calc(100vh-95px)]" direction="vertical" sizes={[60, 40]} minSize={60}>
        <div className="w-full overflow-auto relative">
          <CodeMirror
            value={code}
            theme={vscodeDark}
            extensions={[LANGUAGE_CONFIG[language].extension()]}
            onChange={(value) => setCode(value)}
            editable={!isSubmitted}
          />
          {isSubmitted && (
            <div className="absolute top-0 left-0 right-0 bg-gray-900/60 text-white text-center py-2 z-10" aria-live="polite">
              This solution has already been submitted and cannot be modified.
            </div>
          )}
          {loading && (
            <div className="absolute top-12 left-0 right-0 z-20 flex justify-center items-center">
              <span className="loader" aria-label="Loading..." />
            </div>
          )}
        </div>

        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <span className="text-sm font-medium leading-5 text-white">Testcases</span>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          {submissionStatus && isSubmitted && (
            <div className={`mt-2 p-2 rounded-md ${submissionStatus === "Accepted"
              ? "bg-green-800/30 text-green-400"
              : submissionStatus === "Wrong Answer"
                ? "bg-red-800/30 text-red-400"
                : "bg-yellow-800/30 text-yellow-400"
              }`} aria-live="assertive">
              Status: {submissionStatus}
              {submissionStatus === "Accepted" && <span className="ml-2">✓</span>}
            </div>
          )}

          <div className="font-semibold my-4">
            {problem.testCases && problem.testCases.map((testcase, index) => (
              <div key={index} className="mb-6">
                <label className="text-sm font-medium mt-4 text-white">Input {index + 1}:</label>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                  {testcase.input}
                </div>
                <label className="text-sm font-medium mt-4 text-white">Expected Output {index + 1}:</label>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                  {testcase.output}
                </div>
                {output.length > index && (
                  <>
                    <label className="text-sm font-medium mt-4 text-white">Your Output {index + 1}:</label>
                    <div
                      className={`w-full rounded-lg border px-3 py-[10px] mt-2 bg-dark-fill-3 border-transparent text-white ${output[index]?.trim() === testcase.output.trim()
                        ? "border-green-500"
                        : "border-red-500"
                        }`}
                    >
                      {output[index] || ""}
                    </div>
                  </>
                )}
              </div>
            ))}
            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-900/20 rounded-md mt-2" role="alert">
                Error: {error}
              </div>
            )}
          </div>
        </div>
      </Split>

      <EditorFooter
        onRun={handleRun}
        onSubmit={handleSubmit}
        loading={loading}
        alreadySubmitted={isSubmitted}
      />
    </div>
  );
};

export default Playground;
