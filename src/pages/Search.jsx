import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import SearchFilters from '../components/SearchFilters'

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
    const { idDrink, strDrink, strCategory, strAlcoholic, strGlass, strDrinkThumb } = result;

    return <Link to={`/cocktails/${idDrink}`} key={i} className="cocktail-result">
      <img src={strDrinkThumb} alt={strDrink} width="300px" height="200px" />
      <div>
        <h2>{strDrink}</h2>
        <p>{strGlass} {strCategory} {strAlcoholic}</p>
      </div>
    </Link>
  });

  function showFiltersModal() {
    console.log('show modal')
  }

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
        <input 
         className="search-input"
         value={searchInputValue}
         onChange={(e) => setSearchInputValue(e.target.value)}
        />
        <div className="filters-modal">
            <h2 onClick={() => setIsModalOpen(prev => !prev)}>Filtres</h2>
            {
              isModalOpen && 
              <SearchFilters handleSearchFilters={handleSearchFilters} />
            }
        </div>
        <section className="search">
          <h1>Cocktails</h1>
        </section>
        <section className="results">
          <div className="filters">
            <SearchFilters handleSearchFilters={handleSearchFilters} />
          </div>
          <div className="cocktails">
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