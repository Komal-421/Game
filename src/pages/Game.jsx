import React, { useContext, useEffect, useState, createContext } from 'react'
// import { context } from '../components/CategoriesList'
// import FetchQues from '../hooks/UseFetchQuestions'
import UseFetchQuestions from '../hooks/UseFetchQuestions';
import { MyContext } from './Home';
import { useNavigate } from 'react-router-dom'
import Scoreboard from './Scoreboard';
import { NewContext } from '../context/GameProvider'


import { useLocation } from "react-router-dom";
// import Scoreboard from './Scoreboard';



function Game() {
    const { gameCompleted, setGameCompleted } = useContext(NewContext);
    const navigate = useNavigate();
    const { field, players } = useLocation().state;
    const data = UseFetchQuestions(field);
    const [answered, setAnswered] = useState(false);
    const [idx, setIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [options, setOptions] = useState([]);
    const [points, setPoints] = useState({
        player1Points: 0,
        player2Points: 0
    });


    const questions = [data.easy, data.med, data.hard].flat()

    useEffect(() => {
        const options = [questions[idx]?.correctAnswer, ...questions[idx]?.incorrectAnswers || []];
        options.sort(() => Math.random() - 0.5);
        setOptions(options);
    }, [data, idx])

    useEffect(() => {
        if (gameCompleted) {
            navigate('/scoreboard', {
                state: { players, points }
            });
        }
    }, [gameCompleted, navigate, players, points]);


    const check = (e) => {
        setSelected(e.target.value);
        if (answered)
            return;
        else
            setAnswered(true);
        if (e.target.value === questions[idx].correctAnswer) {
            if (idx % 2 === 0) {
                if (idx === 0) {
                    setPoints((prev) => ({
                        ...prev, player1Points: 10
                    }

                    ))
                }
                else if (idx === 2) {
                    setPoints((prev) => ({
                        ...prev, player1Points: prev.player1Points + 15
                    }))
                }
                else if (idx === 4) {
                    setPoints((prev) => ({
                        ...prev, player1Points: prev.player1Points + 20
                    }))
                }
            }
            else if (idx % 2 !== 0) {
                if (idx === 1) {
                    setPoints((prev) => ({
                        ...prev, player2Points: 10
                    }))
                }
                else if (idx === 3) {
                    setPoints((prev) => ({
                        ...prev, player2Points: prev.player2Points + 15
                    }))
                }
                else if (idx === 5) {
                    setPoints((prev) => ({
                        ...prev, player2Points: prev.player2Points + 20
                    }))
                }
            }
        }

    }

    // { if (gameOver) return checkScore(); }
    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6">

                {/* Header */}
                <h1 className="text-3xl font-bold text-center text-indigo-700 mb-5">
                    Quiz Battle
                </h1>

                {/* Points */}
                <div className="flex justify-center gap-4 mb-5">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        Easy +10
                    </span>

                    <span className="bg-yellow-400 px-3 py-1 rounded-full text-sm">
                        Medium +15
                    </span>

                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        Hard +20
                    </span>
                </div>

                {/* Players */}
                <div className="flex justify-between gap-4 mb-5">

                    <div
                        className={`flex-1 rounded-lg p-4 text-center shadow ${idx % 2 === 0
                            ? "bg-green-600 text-white"
                            : "bg-gray-100"
                            }`}
                    >
                        <h2 className="text-lg font-semibold">
                            {players.player1}
                        </h2>

                        <p className="text-2xl font-bold">
                            {points.player1Points}
                        </p>
                    </div>

                    <div
                        className={`flex-1 rounded-lg p-4 text-center shadow ${idx % 2 !== 0
                            ? "bg-green-600 text-white"
                            : "bg-gray-100"
                            }`}
                    >
                        <h2 className="text-lg font-semibold">
                            {players.player2}
                        </h2>

                        <p className="text-2xl font-bold">
                            {points.player2Points}
                        </p>
                    </div>

                </div>

                {/* Turn */}
                <div className="flex justify-between items-center mb-5">

                    <div>
                        <p className="text-gray-500 text-sm">
                            Current Turn
                        </p>

                        <h2 className="text-xl font-semibold text-indigo-700">
                            {idx % 2 === 0
                                ? players.player1
                                : players.player2}
                        </h2>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Question {idx + 1} / {questions.length}
                        </p>
                    </div>

                </div>

                { }
                <div
                    key={questions[idx]?.id}
                    className="bg-slate-50 border rounded-lg shadow-sm p-5"
                >
                    {idx < 6 && <>
                        <p className="text-xl font-semibold text-center mb-6">
                            {questions[idx]?.question.text}
                        </p>

                        <div className="grid grid-cols-2 gap-4 place-items-center">

                            {options.map((opt) => (
                                <button key={opt}
                                    value={opt}
                                    onClick={check}
                                    className={`w-60 h-25 rounded-lg font-medium transition
                                    ${selected === opt ? selected === questions[idx].correctAnswer ?
                                            "bg-green-500 text-white"
                                            : "bg-red-500 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}

                        </div></>}

                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={() => {
                                if (idx > 0) {
                                    setIdx(prev => prev - 1);
                                    setAnswered(true);
                                }
                            }}
                            disabled={idx === 0}
                            className={`px-8 py-3 rounded-lg font-semibold shadow transition
                        ${idx === 0
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-gray-600 hover:bg-gray-700 text-white"
                                }`}
                        >
                            ← Previous
                        </button>

                        <button
                            disabled={!answered}
                            onClick={() => {
                                if (idx < 5) {
                                    setIdx(prev => prev + 1);
                                    setAnswered(false);
                                } else {
                                    console.log("Points before-> ", points);
                                    navigate('/scoreboard', {
                                        state: {
                                            players,
                                            points
                                        }

                                    },);
                                    setGameCompleted(true);
                                }
                            }}
                            className={`px-8 py-3 rounded-lg font-semibold shadow transition
                                ${!answered
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-amber-400 hover:bg-amber-500"
                                }`}
                        >
                            {idx === 5 ? "Finish" : "Next →"}
                        </button>

                    </div>

                </div>

            </div>

        </div >
    )
}

export default Game