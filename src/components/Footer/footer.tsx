import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-black/90 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <a href="/" className="inline-flex items-center">
                            <span className="text-white text-xl font-extrabold tracking-tight">
                                CodeQuest
                            </span>
                        </a>
                        <p className="text-gray-400 text-sm mt-3">
                            Practice. Compete. Learn. Track progress with powerful tools for students and teachers.
                        </p>

                        {/* Social */}
                        <div className="flex items-center gap-3 mt-5">
  <a
    href="https://github.com/vansh-000"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub profile (opens in new tab)"
    className="p-2 rounded-md border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition"
  >
    <Github className="w-4 h-4" />
  </a>

  <a
    href="https://www.linkedin.com/in/vansh000"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn profile (opens in new tab)"
    className="p-2 rounded-md border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition"
  >
    <Linkedin className="w-4 h-4" />
  </a>

  <a
    href="mailto:questcode000@gmail.com"
    aria-label="Email"
    className="p-2 rounded-md border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition"
  >
    <Mail className="w-4 h-4" />
  </a>
</div>

                    </div>

                    <nav aria-label="Students" className="text-sm">
                        <h3 className="text-white font-semibold mb-3">User Features</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-200 transition">
                                    Practice Problems
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-200 transition">
                                    Exams
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-200 transition">
                                    Submissions & Status
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-200 transition">
                                    Profile & Progress
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Teachers */}
                    <nav aria-label="Teachers" className="text-sm">
                        <h3 className="text-white font-semibold mb-3">Admin Features</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-200 transition">
                                    Submissions Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-200 transition">
                                    Scores & Exports
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-200 transition">
                                    Problem Bank
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-200 transition">
                                    Modify Scores
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Bottom bar */}
                <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">
                        © {year} CodeQuest. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                            Status
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                            Security
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-200 transition">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
