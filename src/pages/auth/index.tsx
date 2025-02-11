import React from "react";
import { Code, Trophy, Users } from "lucide-react";
import Button from "@/components/UI/Button";
import Navbar from "@/components/Navbar/Navbar";
import AuthModal from "@/components/Modals/AuthModal";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-200">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center space-y-8 py-16 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl">
          Master Coding Challenges
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed">
          Practice, compete, and improve your coding skills with our wide range of problems and contests.
        </p>
        <div className="mt-6 flex space-x-6">
          <Button label="Get Started" variant="primary" />
          <Button label="Learn More" variant="secondary" />
        </div>
      </div>

      <AuthModal />

      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 px-6">
          <div className="bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
            <div className="mb-6 flex justify-center">
              <Code className="w-16 h-16 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Practice Problems</h3>
            <p className="text-gray-400 leading-relaxed">
              Solve a variety of coding problems to sharpen your skills.
            </p>
          </div>
          <div className="bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
            <div className="mb-6 flex justify-center">
              <Trophy className="w-16 h-16 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Contests</h3>
            <p className="text-gray-400 leading-relaxed">
              Participate in coding contests and climb the leaderboard.
            </p>
          </div>
          <div className="bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
            <div className="mb-6 flex justify-center">
              <Users className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Community</h3>
            <p className="text-gray-400 leading-relaxed">
              Join a community of coders, share knowledge, and collaborate.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;