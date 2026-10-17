import React, { useState, useEffect } from 'react'

function UseFetchQuestions(field) {
    const [data, setData] = useState({
        easy: [],
        med: [],
        hard: []
    })
    console.log("Selected category:", field);
    const FetchQues = () => {
        Promise.all([
            fetch(`https://the-trivia-api.com/v2/questions?limit=2&categories=${field}&difficulties=easy&type=multiple`),
            fetch(`https://the-trivia-api.com/v2/questions?limit=2&categories=${field}&difficulties=medium&type=multiple`),
            fetch(`https://the-trivia-api.com/v2/questions?limit=2&categories=${field}&difficulties=hard&type=multiple`),
        ])
            .then(([resEasy, resMed, resHard]) => {
                return Promise.all([resEasy.json(), resMed.json(), resHard.json()])
            })
            .then(([easyData, medData, hardData]) => { setData({ easy: easyData, med: medData, hard: hardData }) });
    }

    useEffect(() => FetchQues(), [field]);
    useEffect(() => console.log(data.easy), [data]);
    // FetchQues();
    return (
        data
    )
}

export default UseFetchQuestions