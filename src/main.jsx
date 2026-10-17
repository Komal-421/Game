import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Welcome from './pages/Welcome.jsx'
import Home from './pages/Home.jsx'
import Game from './pages/Game.jsx'
import Scoreboard from './pages/Scoreboard.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CategoriesList from './components/CategoriesList.jsx'
import React from 'react'
import GameProvider from './context/GameProvider.jsx'


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <StrictMode>

      <GameProvider>
        <CategoriesList>
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/setup" element={<Home />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/scoreboard" element={<Scoreboard />}></Route>
          </Routes>
        </CategoriesList>
      </GameProvider>
      {/* <Welcome /> */}
    </StrictMode>
  </BrowserRouter>
)
