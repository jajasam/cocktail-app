import { useState, useEffect } from 'react';

import '../styles/Header.css'

function Header() {
    const [topOffset, setTopOffset] = useState(0)
    window.addEventListener('scroll', (e) => {
        setTopOffset(window.pageYOffset)
    })

  return (
    <header className={topOffset > 0 ? 'sticky' : ''}>
        <div className="content">
            <nav>
                <ul>
                    <li>
                        Search Cocktails by Name
                    </li>
                    <li>
                        Search Cocktails by Ingredients
                    </li>
                </ul>
            </nav>
            <img 
             src={require('../assets/logo.png')} 
             alt="Cheers! Logo" 
             className={`logo ${topOffset > 0 ? 'small' : ''}`}
            />
            <div className="hamburger-icon">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </header>
  )
}

export default Header