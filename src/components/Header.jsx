import { Link, useLocation } from 'react-router-dom'

import '../styles/Header.css'

function Header() {
    const { pathname } = useLocation()
    
  return (
    <header>
        <div className="content">
            <Link to="/">
                <img 
                src={require(`../assets/logo-${pathname.match(/cocktail/) ? 'dark' : 'light'}.png`)} 
                alt="Cheers! Logo" 
                className="logo"
                />
            </Link>
        </div>
    </header>
  )
}

export default Header