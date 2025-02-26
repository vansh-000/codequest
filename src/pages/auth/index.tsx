import React, { useEffect, useState } from "react";
import { Code, Trophy, Users, ChevronRight, Star, Terminal } from "lucide-react";
import Button from "@/components/UI/Button";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/footer";
import AuthModal from "@/components/Modals/AuthModal";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

const HomePage: React.FC = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen text-gray-200">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center space-y-8 py-20 md:py-28 lg:py-32">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 text-sm font-medium mb-2">
              Welcome to CodeQuest
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                Master Coding Challenges
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed">
              Practice, compete, and improve your coding skills with our wide range of problems and contests.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
              <Button label="Get Started" variant="primary" fullWidth={false} />
              <Button label="Learn More" variant="secondary" fullWidth={false} />
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 max-w-3xl w-full">
              <StatCard value="1,200+" label="Problems" />
              <StatCard value="500K+" label="Submissions" />
              <StatCard value="50K+" label="Users" />
            </div>
          </div>
        </div>
      </div>

      {authModal.isOpen && <AuthModal />}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] bg-center opacity-5"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-blue-400">CodeQuest</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8">
            <FeatureCard
              icon={<Code className="w-14 h-14 sm:w-16 sm:h-16 text-blue-400" />}
              title="Practice Problems"
              description="Solve a variety of coding problems to sharpen your skills."
            />
            <FeatureCard
              icon={<Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-green-400" />}
              title="Contests"
              description="Participate in coding contests and climb the leaderboard."
            />
            <FeatureCard
              icon={<Users className="w-14 h-14 sm:w-16 sm:h-16 text-purple-400" />}
              title="Community"
              description="Join a community of coders, share knowledge, and collaborate."
            />
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-black relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Supported Languages</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Solve problems in your favorite programming language</p>
          </div>
          <div className="text-center mb-10">
            <button className="inline-flex items-center text-blue-400 hover:text-blue-300 transition">
              See all supported languages
            </button>
          </div>
          <div className="grid mt-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            <LanguageCard name="Python" />
            <LanguageCard name="JavaScript" />
            <LanguageCard name="Java" />
            <LanguageCard name="C++" />
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to start coding?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of developers who are improving their skills every day</p>
          <Button label="Sign up for free" variant="primary" fullWidth={false} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center border border-gray-700">
      <div className="mb-5 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const StatCard = ({ value, label }: { value: string, label: string }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
};

const LanguageCard = ({ name }: { name: string }) => {
  return (
    <div className="bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-center transition">
      <Terminal className="w-5 h-5 text-blue-400 mr-2" />
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default HomePage;