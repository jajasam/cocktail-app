import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import SearchFilters from '../components/SearchFilters'

import searchIcon from '../assets/search.svg'

import '../styles/Search.css'

function Search() {
  const [results, setResults] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')

  useEffect(() => {
      //get 10 random cocktails when there are no filters
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => setResults(data.drinks))
        .catch(err => console.error(err))
  }, []);

  function handleSearchFilters(searchFilter, param) {
    const newSearchFilter = searchFilter.split(' ').join('_')

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${param}=${newSearchFilter}`)
        .then(res => res.json())
        .then(data => setResults(data.drinks))
        .catch(err => console.error(err))
  }

  //handle search input
  useEffect(() => {
    if (!searchInputValue) return;
    //search cocktail by name
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInputValue}`)
    .then(res => res.status === 200 && res.json())
    .then(data => {
      if (data) {
        return setResults(data.drinks)
      }
    })

    //search ingredients by name 
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${searchInputValue}`)
    .then(res => res.status === 200 && res.json())
    .then(data => {
      if (data.ingredients) {
        return setResults(data.ingredients)
      }
    })
  }, [searchInputValue])


  const resultsElem = results?.map((result, i) => {
    const { idDrink, strDrink, strDrinkThumb } = result;

    return <div>
      <Link to={`/cocktails/${idDrink}`} key={i} className="cocktail-result">
        <img src={strDrinkThumb} alt={strDrink} width="300px" height="200px" />
        <div>
          <h2>{strDrink}</h2>
        </div>
      </Link>
    </div>
  });

  return (
    <>
      <section className="search-banner">
        {/* Photo by M.S. Meeuwesen on Unsplash */}
          <img 
           src={require('../assets/search-banner.jpg')} 
           alt="Cocktails"
          />
      </section>
      <main className={`search ${isModalOpen ? 'overlay' : ''}`}>
        <div className="search-bar">
          <input 
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          />
          {/* Discover a world of flavors */}
          <img 
           src={searchIcon} 
           alt="Search Icon"
           width="20px"
           height="20px"
           className="search-icon"
          />
        </div>
        <section className="mobile-filters-menu">
            <p onClick={() => setIsModalOpen(prev => !prev)} className="filters-btn">Filtres</p>
            {
              isModalOpen && 
              <div className="filters-modal">
                <div className="top">
                  <h2>Filtres</h2>
                  <p onClick={() => setIsModalOpen(prev => !prev)}>X</p>
                </div>
                <SearchFilters 
                 handleSearchFilters={handleSearchFilters}
                 setIsModalOpen={setIsModalOpen} 
                />
              </div>
            }
        </section>
        <section className="results">
          <div className="filters">
            <SearchFilters handleSearchFilters={handleSearchFilters} />
          </div>
          <div className="cocktails">
            <h1>Cocktails</h1>
            {
              !results &&
              <p>We couldn't find any results for "{searchInputValue}"</p>
            }
            {
              resultsElem && resultsElem
            }
          </div>
        </section>
    </main>
  </>
  )
}

export default Search