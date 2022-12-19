import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import SearchFilters from '../components/SearchFilters'

import '../styles/Search.css'

function Search() {
  const [results, setResults] = useState()

  useEffect(() => {
      //get random cocktails when there are no filters
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(data => setResults(data.drinks))
      .catch(err => console.error(err))
  }, []);

  return (
    <>
      <section className="search-banner">
          {/* Photo by Kaizen Nguyễn on Unsplah */}  
          <img 
          src={require('../assets/search-banner-2.jpg')} 
          alt="Cocktails"
          />
          {/* Discover a world of flavors */}
      </section>
      <main>
        <section className="search">
          <h1>Cocktails</h1>
        </section>
        <section className="results">
          <div className="filters">
            <SearchFilters />
          </div>
          <div className="cocktails">
            <Link to="/cocktails/11007">
              <div className="cocktail"></div>
            </Link>
            <div className="cocktail"></div>
            <div className="cocktail"></div>
            <div className="cocktail"></div>
            <div className="cocktail"></div>
            <div className="cocktail"></div>
          </div>
        </section>
    </main>
  </>
  )
}

export default Search