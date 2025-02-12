import React, { useEffect, useState } from "react";
import { Code, Trophy, Users } from "lucide-react";
import Button from "@/components/UI/Button";
import Navbar from "@/components/Navbar/Navbar";
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
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-gray-200">
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center space-y-8 py-20 px-4 md:px-8 lg:px-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl">
          Master Coding Challenges
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed">
          Practice, compete, and improve your coding skills with our wide range of problems and contests.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
          <Button label="Get Started" variant="primary" fullWidth={false} />
          <Button label="Learn More" variant="secondary" fullWidth={false} />
        </div>
      </div>

      {authModal.isOpen && <AuthModal />}

      <section className="py-16 sm:py-20 bg-stone-900">
        <div className="max-w-6xl mx-auto grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8">
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
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-black p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
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

export default HomePage;