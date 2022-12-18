import { useEffect, useState, useRef } from 'react'

import '../styles/Search.css'

function Search() {
  const [results, setResults] = useState()
  const [filters, setFilters] = useState([
    {
      category: 'Categories',
      param: 'c',
      subFilters: [],
      isVisible: false
    },
    {
      category: 'Alcohols',
      param: 'a',
      subFilters: [],
      isVisible: false
    },
    {
      category: 'Glasses',
      param: 'g',
      subFilters: [],
      isVisible: false
    },
    {
      category: 'Ingredients',
      param: 'i',
      subFilters: [],
      isVisible: false
    }
  ])
  const [filtersElem, setFiltersElem] = useState(null)

  useEffect(() => {
      //get random cocktails when there are no filters
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(data => setResults(data.drinks))
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    //set filters 
    filters.map(elem => fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${elem.param}=list`)
    .then(res => res.json())
    .then(data => setFilters(prev => [
      ...prev,
      {
        category: elem.category,
        param: elem.param,
        subFilters: data.drinks
      }
    ]),
  ))}, [])

  function handleFiltersVisibility(categoryToUpdate) {
    //update filters visibility when category is clicked
    filters.map(obj => 
    obj.category === categoryToUpdate ? 
    setFilters(prev => [
      ...prev,
      {
        ...obj,
        isVisible: !obj.isVisible
      }
    ]) : '')
  }

  useEffect(() => {
    setFiltersElem(filters.map((elem,i)  => elem.subFilters.length > 0 ? 
      <div key={i}>
        <p onClick={(e) => handleFiltersVisibility(elem.category)}>
          <span>{elem.category}</span>
          <span>⌄</span>
        </p>
        {
          elem.isVisible && 
          elem.subFilters.map((el, i) => <p key={i}>{Object.values(el)}</p>)
        }
      </div> : ''
    )
  )
}, [filters])
  
  return (
    <>
      <section className="search-banner">
          {/* Photo by Kaizen Nguyễn on Unsplah */}  
          <img 
          src={require('../assets/search-banner-2.jpg')} 
          alt="Cocktails"
          />
      </section>
      <main>
        <section className="search">
          <h1>Cocktails</h1>
        </section>
        <section className="results">
          <div className="filters">
              {
                filtersElem &&
                filtersElem
              }
          </div>
          <div className="cocktails">
            <div className="cocktail"></div>
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