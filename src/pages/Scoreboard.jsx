
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NewContext } from '../context/GameProvider';

function Scoreboard() {
    const location = useLocation();
    const navigate = useNavigate();

    const { setGameCompleted } = useContext(NewContext);
    const { players, points } = location.state || {}
    console.log("points are->", points);

    if (!points) {
        console.log("Points-> ", points);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="bg-white w-[430px] rounded-3xl shadow-2xl p-8 text-center">
                    <h2 className="text-2xl font-semibold mb-6">
                        No game data available
                    </h2>

                    <button
                        onClick={() => navigate("/setup")}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-xl shadow-lg transition-all"
                    >
                        🎮 Start New Game
                    </button>
                </div>
            </div>
        );
    }
    else {
        let winner;

        if (points.player1Points > points.player2Points) {
            winner = players.player1;
        } else if (points.player2Points > points.player1Points) {
            winner = players.player2;
        }

        // Tie
        if (!winner) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
                    <div className="bg-white w-[430px] rounded-3xl shadow-2xl p-8 text-center">

                        <h1 className="text-5xl font-bold text-orange-500 mb-6">
                            🤝 It's a Tie!
                        </h1>

                        <div className="space-y-3 text-xl mb-8">
                            <p>
                                {players.player1}:{" "}
                                <span className="font-bold">
                                    {points.player1Points}
                                </span>
                            </p>

                            <p>
                                {players.player2}:{" "}
                                <span className="font-bold">
                                    {points.player2Points}
                                </span>
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                navigate("/setup");
                                setGameCompleted(false);
                            }}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
                        >
                            🔄 Play Again
                        </button>
                    </div>
                </div>
            );
        }

        // Winner
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
                <div className="bg-white w-[430px] rounded-3xl shadow-2xl p-8 text-center">

                    <h1 className="text-5xl font-bold text-orange-500 mb-6">
                        🏆 Winner!
                    </h1>

                    <h2 className="text-2xl font-semibold mb-6">
                        {winner} Wins!
                    </h2>

                    <div className="text-lg space-y-2 mb-8">
                        <p>
                            {players.player1}:{" "}
                            <span className="font-bold">
                                {points.player1Points}
                            </span>
                        </p>

                        <p>
                            {players.player2}:{" "}
                            <span className="font-bold">
                                {points.player2Points}
                            </span>
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            navigate("/setup");
                            setGameCompleted(false);
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
                    >
                        🔄 Play Again
                    </button>
                </div>
            </div>
        );
    }
}

export default Scoreboard;

