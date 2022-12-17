import { useState, useEffect, useRef } from 'react'

import './App.css';

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'

function App() {

  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
