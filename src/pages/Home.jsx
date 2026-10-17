import React, { createContext, useEffect, useState } from 'react'
import UseFetchQuestions from '../hooks/UseFetchQuestions'
import { useNavigate } from 'react-router-dom'
// import CategoriesList from '../components/Home.jsx'
import { useContext } from 'react'
import { context } from '../components/CategoriesList'
import Game from './Game.jsx'


export const MyContext = createContext()

function Home() {
    const [field, setField] = useState("");
    const navigate = useNavigate();
    const newlst = useContext(context);
    console.log("Context value:", newlst);



    const [players, setPlayers] = useState({
        player1: "",
        player2: ""
    })


    const selectField = (e) => {
        setField(e.target.value);
    }

    const set_names = (e) => {
        setPlayers({
            ...players, [e.target.name]: e.target.value
        })
    }

    const submit = () => {
        if (!field) {
            alert("Please select a category!");
            return;
        }

        if (
            players.player1.trim() !== "" &&
            players.player2.trim() !== ""
        ) {
            navigate('/game', {
                state: { field, players }
            });
        } else {
            alert("Enter both players' names!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-6">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden">

                <div className="grid md:grid-cols-2">

                    {/* Left Side */}
                    <div className="p-10">

                        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
                            🎯 Quiz Battle
                        </h1>

                        <p className="text-gray-500 mb-8">
                            Challenge your friend and find out who knows more!
                        </p>

                        {/* Category */}
                        <div className="mb-6">
                            <label className="block text-lg font-semibold mb-2">
                                Select Category
                            </label>

                            <select
                                id="category"
                                value={field}
                                onChange={selectField}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                            >
                                <option value="">-- Select a category --</option>

                                {newlst.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Player 1 */}
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">
                                Player 1
                            </label>

                            <input
                                type="text"
                                name="player1"
                                placeholder="Enter Player 1 Name"
                                onChange={set_names}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Player 2 */}
                        <div className="mb-8">
                            <label className="block text-lg font-semibold mb-2">
                                Player 2
                            </label>

                            <input
                                type="text"
                                name="player2"
                                placeholder="Enter Player 2 Name"
                                onChange={set_names}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        <button
                            onClick={submit}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg py-3 rounded-xl shadow-lg transition duration-300 hover:scale-[1.02]"
                        >
                            🚀 Start Quiz
                        </button>

                    </div>

                    {/* Right Side */}
                    <div className="bg-indigo-50 flex items-center justify-center p-10">

                        <img
                            src="/image.png"
                            alt="Quiz"
                            className="w-full max-w-sm drop-shadow-2xl"
                        />

                    </div>

                </div>

            </div>

        </div>
    );


}

export default Home