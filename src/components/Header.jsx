import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import debounce from 'lodash.debounce'

import '../styles/Header.css'

function Header() {
    const [topOffset, setTopOffset] = useState(0)
    window.addEventListener('scroll', debounce(() => {
        setTopOffset(window.pageYOffset)
    }, 25))
    
  return (
    <header className={topOffset > 0 ? 'sticky' : ''}>
        <div className="content">
            <Link to="/">
                <img 
                src={require('../assets/logo.png')} 
                alt="Cheers! Logo" 
                className={`logo ${topOffset > 0 ? 'small' : ''}`}
                />
            </Link>
        </div>
    </header>
  )
}

export default Header