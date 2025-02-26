import React from 'react';

type footerProps = {

};

const footer: React.FC<footerProps> = () => {

    return (
        <footer className="bg-black py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
                    <div className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2025 CodeQuest. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-300">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-gray-300">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-gray-300">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default footer;