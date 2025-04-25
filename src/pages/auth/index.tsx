import React, { useEffect, useState } from "react";
import { Code, Trophy, Users, Terminal, ChevronRight, Star, ArrowRight, PlayCircle, Check } from "lucide-react";
import Button from "@/components/UI/Button";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/footer";
import AuthModal from "@/components/Modals/AuthModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const authModal = useRecoilValue(authModalState);
  const user = authModal.user;
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("javascript");
  const [codeSubmitted, setCodeSubmitted] = useState(false);

  useEffect(() => {
    // Fade-in animation for components
    setIsVisible(true);

    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleRunCode = () => {
    setCodeSubmitted(true);

    // Reset after 2 seconds
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
                Practice, compete, and improve your coding skills with our wide
                range of problems and contests. Join thousands of developers on their journey.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 lg:justify-start justify-center">
                <Button
                  label="Get Started"
                  variant="primary"
                  onClick={() => {
                    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
                  }}
                />
                <Button
                  label="Learn More"
                  variant="secondary"
                />
              </div>
            </div>

            {/* Right Side - Code Editor */}
            <div className="w-full h-full">
              <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden transform hover:scale-[1.01] transition duration-300">
                {/* Editor Header */}
                <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-400">Two Sum Problem</div>
                  <div></div> {/* Empty div for flex spacing */}
                </div>

                {/* Editor Tabs */}
                <div className="flex bg-gray-800 border-b border-gray-700">
                  {['javascript', 'python', 'java'].map(lang => (
                    <button
                      key={lang}
                      className={`px-4 py-2 text-sm font-medium ${activeTab === lang ? 'bg-gray-900 text-blue-400 border-t-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                      onClick={() => setActiveTab(lang)}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Code Editor Content */}
                <div className="h-80 overflow-auto p-4 bg-gray-900 font-mono text-sm text-gray-200">
                  <pre className="whitespace-pre-wrap">
                    {codeSnippets[activeTab]}
                  </pre>
                </div>

                {/* Editor Footer */}
                <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-t border-gray-700">
                  <div className="text-xs text-gray-400">
                    Difficulty: Easy
                  </div>
                  <button
                    className={`flex items-center px-4 py-1 rounded-md text-sm font-medium ${codeSubmitted ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'} transition`}
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

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatCard value="1,200+" label="Coding Problems" icon={<Code className="w-6 h-6" />} />
            <StatCard value="500K+" label="Total Submissions" icon={<Terminal className="w-6 h-6" />} />
            <StatCard value="50K+" label="Active Users" icon={<Users className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] bg-center opacity-5"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">
              Why Choose <span className="text-blue-400">CodeQuest</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4">
              Everything you need to become a better programmer in one platform
            </p>
          </div>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 mt-10">
            <FeatureCard
              icon={<Code className="text-blue-400" />}
              title="Practice Problems"
              description="Solve a variety of coding problems to sharpen your skills with progressive difficulty levels."
            />
            <FeatureCard
              icon={<Trophy className="text-green-400" />}
              title="Contests"
              description="Participate in weekly coding contests and climb the leaderboard to show off your skills."
            />
            <FeatureCard
              icon={<Users className="text-purple-400" />}
              title="Community"
              description="Join a thriving community of coders, share knowledge, and collaborate on solutions."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-black/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">How It Works</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StepCard
              number="01"
              title="Create Account"
              description="Sign up for free and set up your developer profile."
            />
            <StepCard
              number="02"
              title="Solve Problems"
              description="Choose from hundreds of problems and start coding."
            />
            <StepCard
              number="03"
              title="Track Progress"
              description="Monitor your improvement and earn achievements."
            />
          </div>
        </div>
      </section>

      {/* Supported Languages Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Supported Languages
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Solve problems in your favorite programming language
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mt-10">
            <LanguageCard name="Python" />
            <LanguageCard name="JavaScript" />
            <LanguageCard name="Java" />
            <LanguageCard name="C++" />
            <LanguageCard name="C" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">
              What Our Users Say
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="CodeQuest helped me prepare for technical interviews and land my dream job at a top tech company."
              author="Alex Johnson"
              role="Software Engineer"
            />
            <TestimonialCard
              quote="The practice problems are well-structured and cover a wide range of topics. Perfect for improving algorithmic thinking."
              author="Sarah Chen"
              role="CS Student"
            />
            <TestimonialCard
              quote="Weekly contests keep me motivated and help me continuously improve my coding skills."
              author="Michael Wong"
              role="Full Stack Developer"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to start your coding journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who are improving their skills every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              label="Sign up for free"
              variant="primary"
              onClick={() => {
                setAuthModalState((prev) => ({ ...prev, isOpen: true }));
              }}
            />
            <Button
              label="Explore problems"
              variant="primary"
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Auth Modal */}
      {authModal.isOpen && <AuthModal />}
    </div>
  );
};

/* Feature Card Component */
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition text-center border border-gray-700 group">
    <div className="mb-6 flex justify-center w-16 h-16 bg-gray-800 rounded-2xl p-4 mx-auto group-hover:bg-blue-900/30 transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

/* Statistics Card */
const StatCard = ({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) => (
  <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-blue-500/30 transition-colors">
    <div className="flex justify-center mb-4">
      <div className="bg-blue-500/20 p-3 rounded-full">
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-white mb-2">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

/* Programming Language Card */
const LanguageCard = ({ name }: { name: string }) => (
  <div className="bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-center transition hover:border-blue-500 group">
    <Terminal className="w-5 h-5 text-blue-400 mr-2 group-hover:text-blue-300" />
    <span className="font-medium">{name}</span>
  </div>
);

/* Step Card Component */
const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

/* Testimonial Card Component */
const TestimonialCard = ({ quote, author, role }: { quote: string; author: string; role: string }) => (
  <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
    <div className="flex mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
      ))}
    </div>
    <p className="text-gray-300 mb-6">"{quote}"</p>
    <div>
      <p className="font-medium text-white">{author}</p>
      <p className="text-sm text-gray-400">{role}</p>
    </div>
  </div>
);

export default HomePage;