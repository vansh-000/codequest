import React, { useEffect } from "react";
import { Code, Trophy, Users, Terminal } from "lucide-react";
import Button from "@/components/UI/Button";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/footer";
import AuthModal from "@/components/Modals/AuthModal";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const authModal = useRecoilValue(authModalState);
  const user = authModal.user;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen text-gray-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-center py-20 md:py-28 lg:py-32">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium">
            Welcome to CodeQuest
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 mt-4">
            Master Coding Challenges
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mt-4">
            Practice, compete, and improve your coding skills with our wide
            range of problems and contests.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <Button
              label="Get Started"
              variant="primary"
              onClick={() => router.push("/signup")}
            />
            <Button
              label="Learn More"
              variant="secondary"
              onClick={() => router.push("/about")}
            />
          </div>
          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <StatCard value="1,200+" label="Problems" />
            <StatCard value="500K+" label="Submissions" />
            <StatCard value="50K+" label="Users" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-20 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] bg-center opacity-5"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white">
            Why Choose <span className="text-blue-400">CodeQuest</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto my-4"></div>
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 mt-10">
            <FeatureCard
              icon={<Code className="text-blue-400" />}
              title="Practice Problems"
              description="Solve a variety of coding problems to sharpen your skills."
            />
            <FeatureCard
              icon={<Trophy className="text-green-400" />}
              title="Contests"
              description="Participate in coding contests and climb the leaderboard."
            />
            <FeatureCard
              icon={<Users className="text-purple-400" />}
              title="Community"
              description="Join a community of coders, share knowledge, and collaborate."
            />
          </div>
        </div>
      </section>

      {/* Supported Languages Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Supported Languages
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Solve problems in your favorite programming language
          </p>
          <button
            className="mt-6 text-blue-400 hover:text-blue-300 transition"
            onClick={() => router.push("/languages")}
          >
            See all supported languages
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
            <LanguageCard name="Python" />
            <LanguageCard name="JavaScript" />
            <LanguageCard name="Java" />
            <LanguageCard name="C++" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-center">
        <h2 className="text-4xl font-bold text-white">
          Ready to start coding?
        </h2>
        <p className="text-xl text-gray-300 mt-4">
          Join thousands of developers who are improving their skills every day.
        </p>
        <Button
          label="Sign up for free"
          variant="primary"
          onClick={() => router.push("/signup")}
        />
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
  <div className="bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition text-center border border-gray-700">
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="text-2xl font-bold text-white">{title}</h3>
    <p className="text-gray-400 mt-2">{description}</p>
  </div>
);

/* Statistics Card */
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 text-center">
    <div className="text-3xl font-bold text-white">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

/* Programming Language Card */
const LanguageCard = ({ name }: { name: string }) => (
  <div className="bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-center transition">
    <Terminal className="w-5 h-5 text-blue-400 mr-2" />
    <span className="font-medium">{name}</span>
  </div>
);

export default HomePage;
