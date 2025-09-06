import React, { useEffect, useState } from "react";
import {
  Code,
  Users,
  Terminal,
  ChevronRight,
  ShieldCheck,
  PlayCircle,
  Check,
} from "lucide-react";
import Button from "@/components/UI/Button";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/footer";
import AuthModal from "@/components/Modals/AuthModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";
import { AuthModalState } from "@/atoms/authModalAtom";

const HomePage: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const authModal = useRecoilValue(authModalState) as AuthModalState;
  const user = authModal.user;
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof codeSnippets>("javascript");
  const [codeSubmitted, setCodeSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleRunCode = () => {
    setCodeSubmitted(true);
    setTimeout(() => {
      setCodeSubmitted(false);
    }, 2000);
  };

  // Sample code snippets for different languages
  const codeSnippets = {
    javascript: `function greetUser(username) {
    const message = \`Welcome to CodeQuest, \${username}! 🚀\`;
    console.log(message);
  }
  
  greetUser("Coder123"); 
  `,
    python: `def greet_user(username):
      message = f"Welcome to CodeQuest, {username}! 🚀"
      print(message)
  
  greet_user("Coder123") 
  Welcome to CodeQuest, Coder123! 🚀
  `,
    java: `public class CodeQuestGreeting {
      public static void greetUser(String username) {
          String message = "Welcome to CodeQuest, " + username + "! 🚀";
          System.out.println(message);
      }
  
      public static void main(String[] args) {
          greetUser("Coder123");
      }
  }
  `
  };

  // FAQ content
  const faqs: { q: string; a: string }[] = [
    {
      q: "Who is this platform for?",
      a: "Teachers and students. Teachers can view submissions, modify scores, export score reports to documents/spreadsheets, and add or modify problems. Students can take exams, practice problems, and track progress.",
    },
    {
      q: "How are exams kept secure?",
      a: "Exams are set to auto-submit upon exiting fullscreen, helping prevent tab switching and ensuring test integrity.",
    },
    {
      q: "Can teachers export marks?",
      a: "Yes. Teachers can export scores as documents/spreadsheets for sharing and record keeping.",
    },
    {
      q: "Can teachers manage problem sets?",
      a: "Yes. Teachers can create new problems and edit existing ones, including statements and related settings.",
    },
    {
      q: "Which languages can be used in practice?",
      a: "Python, JavaScript, Java, C++, and C are supported in the practice editor.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen text-gray-200">
      <Navbar />

      {/* Hero Section with Code Editor */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                Welcome to CodeQuest
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 leading-tight">
                Master Coding <span className="block">Challenges</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-xl mt-6">
                Practice, compete, and improve your coding skills with our wide range of problems and contests. Join thousands of developers on their journey.
              </p>

              {/* Security badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm">
                  Secure Exams: Auto-submit on exit from fullscreen
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 lg:justify-start justify-center">
                <Button
                  label="Get Started"
                  variant="primary"
                  onClick={() => {
                    setAuthModalState((prev: AuthModalState) => ({ ...prev, isOpen: true }));
                  }}
                />
              </div>
            </div>
            <div className="w-full h-full">
              <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden transform hover:scale-[1.01] transition duration-300">
                {/* Editor Header */}
                <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-400">Code Safely</div>
                  <div></div>
                </div>

                {/* Editor Tabs */}
                <div className="flex bg-gray-800 border-b border-gray-700">
                  {(["javascript", "python", "java"] as Array<keyof typeof codeSnippets>).map((lang) => (
                    <button
                      key={lang}
                      className={`px-4 py-2 text-sm font-medium ${activeTab === lang
                        ? "bg-gray-900 text-blue-400 border-t-2 border-blue-400"
                        : "text-gray-400 hover:text-gray-200"
                        }`}
                      onClick={() => setActiveTab(lang)}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Code Editor Content */}
                <div className="h-80 overflow-auto p-4 bg-gray-900 font-mono text-sm text-gray-200">
                  <pre className="whitespace-pre-wrap">{codeSnippets[activeTab]}</pre>
                </div>

                {/* Editor Footer */}
                <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-t border-gray-700">
                  <div className="text-xs text-gray-400">Difficulty: Easy</div>
                  <button
                    className={`flex items-center px-4 py-1 rounded-md text-sm font-medium ${codeSubmitted
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                      } transition`}
                    onClick={handleRunCode}
                  >
                    {codeSubmitted ? (
                      <>
                        <Check className="w-4 h-4 mr-1" /> Passed
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 mr-1" /> Run Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">How It Works</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StepCard number="01" title="Create Account" description="Sign up for free and set up your developer profile." />
            <StepCard number="02" title="Solve Problems" description="Choose from hundreds of problems and start coding." />
            <StepCard number="03" title="Track Progress" description="Monitor your improvement and earn achievements." />
          </div>
        </div>
      </section>

      {/* Supported Languages Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Supported Languages</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Solve problems in your favorite programming language
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-10">
            <LanguageCard name="Python" />
            <LanguageCard name="JavaScript" />
            <LanguageCard name="Java" />
            <LanguageCard name="C++" />
            <LanguageCard name="C" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">FAQ</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-4"></div>
            <p className="text-gray-400">Common questions about teachers, students, exams, and exports</p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <FAQItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to start your coding journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who are improving their skills every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              label="Sign up for free"
              variant="primary"
              onClick={() => {
                setAuthModalState((prev: AuthModalState) => ({ ...prev, isOpen: true }));
              }}
            />
            <Button label="Explore problems" variant="primary" />
          </div>
        </div>
      </section>
      <Footer />
      {authModal.isOpen && <AuthModal />}
    </div>
  );
};



const LanguageCard = ({ name }: { name: string }) => (
  <div className="bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-center transition hover:border-blue-500 group">
    <Terminal className="w-5 h-5 text-blue-400 mr-2 group-hover:text-blue-300" />
    <span className="font-medium">{name}</span>
  </div>
);

/* Step Card Component */
const StepCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

/* FAQ Item */
const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/60">
      <button
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left hover:bg-gray-900 transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-semibold text-white">{question}</span>
        <ChevronRight
          className={`w-5 h-5 text-gray-400 transform transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 sm:px-6 pb-4 text-gray-300">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;