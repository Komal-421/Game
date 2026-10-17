import React, { useState, useEffect } from 'react'
import { createContext } from 'react';
import Home from '../pages/Home.jsx'

export const context = createContext();
function categoriesList({ children }) {

    const [fields, setField] = useState({});
    // const [category, setCategory] = useState('')

    useEffect(() => {
        fetch('https://the-trivia-api.com/api/categories')
            .then((res) => res.json())
            .then((categories) => { console.log(categories); setField(categories) });
    }, [])
    const newlst = Object.values(fields).flat();

    // const newlst = [];
    return (
        <div>
            {/* {console.log(newlst)} */}
            <context.Provider value={newlst}>
                {children}
            </context.Provider>
        </div>

    )
}

export default categoriesList