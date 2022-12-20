import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css';

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import CocktailDetails from './pages/CocktailDetails'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/cocktails/:id" element={<CocktailDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
