import React, { createContext, useState } from 'react'

export const NewContext = createContext();

export default function GameProvider({ children }) {

    const [gameCompleted, setGameCompleted] = useState(false);
    return (
        <NewContext.Provider value={{ gameCompleted, setGameCompleted }}>
            {children}
        </NewContext.Provider>
    );
}
