import React from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-6">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden">

                <div className="grid md:grid-cols-2">

                    {/* Left Section */}
                    <div className="flex flex-col justify-center p-12">

                        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
                            🎮 Trivia Battle
                        </h1>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Welcome to the Two-Player Trivia Challenge!
                        </h2>

                        <p className="text-gray-600 leading-7 mb-8">
                            Test your knowledge, compete with your friend,
                            and discover who is the ultimate trivia champion.
                            Answer correctly, earn points, and claim victory!
                        </p>

                        <button
                            onClick={() => navigate('/setup')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-fit"
                        >
                            🚀 Start Game
                        </button>

                    </div>

                    {/* Right Section */}
                    <div className="bg-indigo-50 flex items-center justify-center p-10">

                        <img
                            src="/image.png"
                            alt="Trivia"
                            className="w-full max-w-sm drop-shadow-2xl hover:scale-105 transition duration-300"
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Welcome